const express = require("express");
const router = express.Router();
const axios = require("axios");
function indexExists() {
    return client.indices.exists({
        index: "roledetails"
    });
}
const getUsersWhoHasRole = async (roleName) => {
    // Refresh users index
    await client.indices.refresh({ index: 'userdetails' });

    const response = await client.search({
        index: 'userdetails',
        body: {
            query: {
                match_phrase_prefix: {
                    "roles": roleName
                }
            }
        }
    });

    return response.hits.hits;
}

// This function is responsible for removing the role from the user
const removeRoleFromUsers = async (users, roleName) => {
    // Loop through all users who has this role
    for (let user of users) {
        // Remove the role from array
        const index = user._source.roles.findIndex((u) => {
            console.log(u);
            return (u == roleName)
        });
        user._source.roles.splice(index, 1);
        user._source.id = user._id;
        // Update the user
        const response = await axios.put(`http://localhost:8080/users/edit`, user._source);
        console.log(" from remove users", response);
    }
}

const client = require("../elasticsearchConnection");
router.get("/", (req, res) => {
    const result = indexExists();
    result.then((val) => {
        if (!val) {
            client.indices.create({
                index: 'roledetails'
            }, function (err, resp, status) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("created index", resp);
                }
            });
        }
    })

    client.search({
        index: 'roledetails',
        body: {
            query: {
                match_all: {}
            },
        }
    }, function (error, response, status) {
        if (error) {
            res.json({ error: error });
        }
        else {
            res.json(response.hits.hits);
        }
    });
});

router.get("/:id", async (req, res) => {
    const result = await client.get({
        index: "roledetails",
        type: "roles",
        id: req.params.id
    })

    if (!result.found) {
        res.status(404).json(result)
    }
    else {
        res.status(200).json(result)
    }
})

router.get("/roleName/:roleName", async (req, res) => {
    console.log("in rolename get");
    const result = await client.search({
        index: "roledetails",
        type: "roles",
        body: {
            query: {
                match_phrase_prefix: {
                    roleName: req.params.roleName
                }
            }
        }
    })

    if (result.hits.hits.length > 0) {
        res.status(200).json(result.hits.hits);
    }
    else {
        res.status(404).json({
            message: "not found"
        })
    }
})

router.post("/modules", async (req, res) => {
    result = [];
    console.log("req body", req.body.roles);

    if (Array.isArray(req.body.roles)) {
        for (let i = 0; i < req.body.roles.length; i++) {
            const response = await axios.get(`http://localhost:3000/roles/roleName/${req.body.roles[i]}`);
            result.push(response.data[0]);
        }
        res.status(200).send(result);
    }
    else {
        res.status(400).json({ message: "bad request" });
    }

})
router.get("/roleNames/:roleName", async (req, res) => {
    console.log("in rolename get");
    const result = await client.search({
        index: "roledetails",
        type: "roles",
        body: {
            query: {
                match_phrase_prefix: {
                    roleName: req.params.roleName
                }
            }
        }
    })

    if (result.hits.hits.length > 0) {
        res.status(200).json(result.hits.hits);
    }
    else {
        res.status(404).json({
            message: "not found"
        })
    }
})
router.post("/modulesSync", async (req, res) => {

    console.log("req body", req.body.roles);

    if (Array.isArray(req.body.roles)) {
        result1 = [];
        for (let i = 0; i < req.body.roles.length; i++) {
            const response = await axios.get(`http://localhost:3000/roles/roleNames/${req.body.roles[i]}`);
            result1.push(response.data[0]);
        }
        res.status(200).send(result);
    }
    else {
        res.status(400).json({ message: "bad request" });
    }
})
router.post("/add", async (req, res) => {

    const result = indexExists()
    result.then((val) => {
        if (!val) {
            client.indices.create({
                index: 'roledetails'
            }, function (err, resp, status) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("created index", resp);
                }
            });
        }
    })
    const roleExist = await client.search({
        index: "roledetails",
        type: "roles",
        body: {
            query: {
                match_phrase_prefix: {
                    roleName: req.body.roleName
                }
            }
        }
    });
    console.log("hits", roleExist.hits.hits);
    if (roleExist.hits.hits.length > 0) {
        res.json({ message: "exists" });
    } else {
        client.index({
            index: 'roledetails',
            type: 'roles',
            body: {
                "description": req.body.description,
                "roleName": req.body.roleName,
                "modules": req.body.modules
            }
        }, function (err, resp, status) {
            if (err) {
                res.json({ message: err });
            }
            else {
                res.status(200).json({ message: "success" });
            }
        });
    }
});

router.put("/edit", async (req, res) => {
    try {
        const result = await client.update({
            index: 'roledetails',
            type: "roles",
            id: req.body.id,
            refresh: 'true',
            body: {
                doc: req.body
            }
        })
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

})

async function getRole(id) {
    return await axios.get(`http://localhost:3000/roles/${id}`);
}

router.delete("/delete/:id", async (req, res) => {
    try {
        const response = await getRole(req.params.id);

        // Check which users has this role
        const usersWhoHasRole = await getUsersWhoHasRole(response.data._source.roleName);

        // If any user has this role then remove from them
        if (usersWhoHasRole) {
            // Remove Role form users 
            removeRoleFromUsers(usersWhoHasRole, response.data._source.roleName);
        }

        // Refresh roles index
        await client.indices.refresh({ index: 'roledetails' });

        // Delete the role
        const result = await client.delete({
            index: "roledetails",
            id: req.params.id
        });

        // Send response
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        if (err.displayName == "NotFound") {
            res.status(400).json({
                message: "Role does not exists"
            })
        }
        else {
            res.status(500).json({
                message: "database error"
            })
        }
    }
})

router.post("/moduleExist", async (req, res) => {
    console.log(req.body.moduleName)
    const moduleExist = await client.search({
        index: "roledetails",
        type: "roles",
        body: {
            query: {
                match_phrase_prefix: {
                    "modules.moduleName": req.body.moduleName
                }
            }
        }

    });
    console.log(moduleExist.hits.hits);
    if (req.body.hasOwnProperty("id")) {


        if (moduleExist.hits.hits.length > 1) {
            console.log("more than one")
            res.json({ message: "exists" })
        }
        else if (moduleExist.hits.hits.length == 0) {
            console.log("0 length");
            res.json({ message: "notExists" });
        }
        else if (moduleExist.hits.hits.length == 1) {
            console.log("check id",req.body.id,moduleExist.hits.hits[0]._id);
            if (moduleExist.hits.hits[0]._id == req.body.id) {
                console.log("hello");
                res.json({ message: "notExists" });
            }
            else{
                res.json({message:"exists"});
            }
        }
    }
    else {
        if (moduleExist.hits.hits.length > 0) {
            res.json({ message: "exists" })
        }
        else {
            res.json({ message: "notExists" });
        }

    }
})

module.exports = router;
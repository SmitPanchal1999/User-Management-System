const express = require("express");
const router = express.Router();
function indexExists() {
    return client.indices.exists({
        index: "userdetails"
    });
}
const client = require("../elasticsearchConnection");
router.get("/", (req, res) => {
    const result = indexExists()

    result.then((val) => {
        if (!val) {
            client.indices.create({
                index: 'userdetails'
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
        index: 'userdetails',
        type: 'users',
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
        index: "userdetails",
        id: req.params.id
    })

    if (!result.found) {
        res.status(404).json(result)
    }
    else {
        res.status(200).json(result)
    }
})

router.post("/add", async (req, res) => {
    const result = indexExists()
    result.then((val) => {
        if (!val) {
            client.indices.create({
                index: 'userdetails'
            }, function (err, resp, status) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("created index", resp);
                }
            });
        }
    })
    const emailExist = await client.search({
        index: "userdetails",
        type: "users",
        body: {
            query: {
                match_phrase_prefix: {
                    email: req.body.email
                }
            }
        }

    });

    console.log(emailExist.hits.hits);
    if (emailExist.hits.hits.length > 0) {
        res.json({ message: "exists" });
    } else {
        if (!req.body.admin) {
            client.index({
                index: 'userdetails',
                type: 'users',
                body: {
                    "userName": req.body.userName,
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "email": req.body.email,
                    "password": req.body.password,
                    "roles": req.body.roles,
                    "status": req.body.status
                }
            }, function (err, resp, status) {
                if (err) {
                    res.status(500).json({ message: err });
                }
                else {
                    res.status(200).json({ message: "success" });
                }
            });
        }
        else {
            client.index({
                index: 'userdetails',
                type: 'users',
                body: {
                    "userName": req.body.userName,
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "email": req.body.email,
                    "password": req.body.password,
                    "roles": req.body.roles,
                    "status": req.body.status,
                    "admin": req.body.admin
                }
            }, function (err, resp, status) {
                if (err) {
                    res.status(500).json({ message: err });
                }
                else {
                    res.status(200).json({ message: "success" });
                }
            });
        }
    }

});

router.put("/edit", async (req, res) => {
    try {
        const result = await client.update({
            index: 'userdetails',
            type: "users",
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

router.delete("/delete/:id", async (req, res) => {
    try {
        const result = await client.delete({
            index: "userdetails",
            type: "users",
            id: req.params.id
        });
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        if (err.displayName == "NotFound") {
            res.status(400).json({
                message: "User does not exists"
            })
        }
        else {
            res.status(500).json({
                message: "database error"
            })
        }
    }
})

router.post("/checkUser", async (req, res) => {
    try {
        const userExist = await client.search({
            index: "userdetails",
            type: "users",
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                match_phrase_prefix: {
                                    email: req.body.email
                                }
                            },
                            {
                                match_phrase_prefix: {
                                    password: req.body.password
                                }
                            }
                        ]
                    }
                }
            }
        })
        res.status(200).json(userExist.hits.hits[0]);
    }
    catch (err) {
        if (err.displayName == "NotFound") {
            res.status(400).json({
                message: "NotFound"
            })
        }
        else {
            res.status(500).json({
                message: "database error"
            })
        }
    }
})



module.exports = router;
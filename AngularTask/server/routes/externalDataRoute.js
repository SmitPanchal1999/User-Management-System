const express = require("express");
const router = express.Router();
const axios = require("axios");
function indexExists() {
    return client.indices.exists({
        index: "externaldata"
    });
}
const client = require("../elasticsearchConnection");
router.post("/add", async (req, res) => {

    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    console.log(response.data);
    const result = indexExists();

    result.then((val) => {
        console.log("index exists:", val);
        if (!val) {
            client.indices.create({
                index: 'externaldata'
            }, function (err, resp, status) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("created index", resp);
                }
            });
        }
    })
    const body = response.data.flatMap(doc => [{ index: { _index: 'externaldata' } }, doc]);
    const bulkResponse = await client.bulk({ refresh: true, body })
    console.log(bulkResponse);
    if (bulkResponse.errors) {
        const erroredDocuments = []
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
            const operation = Object.keys(action)[0]
            if (action[operation].error) {
                erroredDocuments.push({
                    // If the status is 429 it means that you can retry the document,
                    // otherwise it's very likely a mapping error, and you should
                    // fix the document before to try it again.
                    status: action[operation].status,
                    error: action[operation].error,
                    operation: body[i * 2],
                    document: body[i * 2 + 1]
                })
            }
        })
        console.log(erroredDocuments)
        res.status(500).json({ message: "error", error: bulkResponse.errors });
    }
    else {
        const { body: count } = await client.count({ index: 'externaldata' })
        console.log(count)
        res.status(200).json({ message: "success", count: count });
    }
})

router.get("/get", async (req, res) => {
    await client.search({
        index: 'externaldata',
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
})
router.post("/pattern", async (req, res) => {
    client.search({
        index: "externaldata",
        body: {
            query: {
                "regexp": {
                    "username": {
                        value: req.body.pattern,
                    }
                }
            }
        }
    }, function (error, response, status) {
        if (error) {
            res.json({ error: error });
        }
        else {
            res.json(response.hits.hits);
        }
    });

})
router.get("/:id", async (req, res) => {
    const result = await client.get({
        index: "externaldata",
        id: req.params.id
    })

    if (!result.found) {
        res.status(404).json(result)
    }
    else {
        res.status(200).json(result)
    }
})
router.put("/edit", async (req, res) => {
    console.log(req.body);
    try {
        const result = await client.update({
            index: "externaldata",
            id: req.body.id,
            body: {
                // put the partial document under the `doc` key
                doc: {
                    email: req.body.email,
                    username: req.body.username,
                    website: req.body.website
                }
            }
        })
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
})

/* router.get("/module/:moduleName",async (req,res)=>{

}) */
module.exports = router;
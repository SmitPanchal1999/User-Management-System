const express = require("express");
const app = express();
const roleRoute = require("../routes/roleRoute");
const client = require("../elasticsearchConnection");
const bodyParser = require("body-parser");
const cors = require("cors");

client.ping({}, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("connected to elasticsearch");
    }
});
app.use(cors());
app.use(bodyParser.json());
app.use("/roles", roleRoute);

const PORT = "3000";
app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
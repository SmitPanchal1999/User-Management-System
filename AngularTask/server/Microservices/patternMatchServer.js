const express = require("express");
const app = express();
const client = require("../elasticsearchConnection");
const bodyParser = require("body-parser");
const cors = require("cors");
const externalDataRoute = require("../routes/externalDataRoute");
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

app.use("/storeData", externalDataRoute);
const PORT = "8000";
app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
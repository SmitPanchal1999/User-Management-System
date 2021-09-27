const express = require("express");
const app = express();
const userRoute = require("../routes/userRoute");
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
app.use("/users", userRoute);

const PORT = "8080";
app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
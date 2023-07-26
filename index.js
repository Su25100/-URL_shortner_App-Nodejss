const express = require("express");
const { connectToMongoDB } = require("./connect");


const urlRoute = require("./routes/urls");

const app = express();
const port = 8000;

const urlconnectdb = "mongodb://127.0.0.1:27017/short-url";

connectToMongoDB(urlconnectdb).then(() => console.log('MongoDB connected'));

app.use(express.json());

app.use("/url", urlRoute);

app.listen(port, () => console.log(`server started at PORT:${port}`));
const express = require("express");


const urlroute = require("./routes/urls");

const port = 5000;
const app = express();

app.use("/url", urlRoute);

app.listen(port, () => console.log(`server started at PORT:${port}`));
const express = require("express");
const { connectToMongoDB } = require("./connect");


const urlRoute = require("./routes/urls");
const URL = require("./models/urls");

const app = express();
const port = 8000;

const urlconnectdb = "mongodb://127.0.0.1:27017/short-url";

connectToMongoDB(urlconnectdb).then(() => console.log('MongoDB connected'));

app.use(express.json());

app.use("/url", urlRoute);

app.get('/:shortId', async(req, res) => {

    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate({
            shortId
        }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        });
        if (!entry) {
            return res.status(404).send("URL not found");
        }

        res.redirect(entry.redirectURL);

    } catch (err) {
        console.error("Error handling the redirect:", err);
        res.status(500).send("Internal Server Error");

    }
});

app.listen(port, () => console.log(`server started at PORT:${port}`));
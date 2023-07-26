const express = require("express");
const { handleGenerateNewShortURL } = require("../controller/urls");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

module.exports = router;
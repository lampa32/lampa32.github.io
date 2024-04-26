const express = require("express");
const axios = require("axios");

const router = express.Router();
const PLUGIN_URL = "http://79.137.205.41/plugin.js";

// Маршрут для получения плагина
router.get("/", async (req, res, next) => {
    try {
        const { data } = await axios.get(PLUGIN_URL);
        res.type("text/javascript").send(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

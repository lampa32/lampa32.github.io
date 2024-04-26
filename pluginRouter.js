// pluginRouter.js
const express = require("express");
const axios = require("axios");

const router = express.Router();
const PLUGIN_URL = "http://79.137.205.41/plugin.js";

// Имитируем логику плагина на сервере
const getDataFromPlugin = async () => {
    try {
        const { data } = await axios.get(PLUGIN_URL);
        // Здесь вы можете обработать данные, полученные из плагина
        return { message: "Это данные, полученные из плагина" };
    } catch (error) {
        throw error;
    }
};

const performActionInPlugin = async (data) => {
    try {
        await axios.post(PLUGIN_URL, data);
        // Здесь вы можете обработать ответ от плагина
        console.log("Выполнено действие в плагине:", data);
    } catch (error) {
        throw error;
    }
};

// Маршрут для получения данных из плагина
router.get("/data", async (req, res, next) => {
    try {
        const data = await getDataFromPlugin();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Маршрут для выполнения действий в плагине
router.post("/action", async (req, res, next) => {
    try {
        await performActionInPlugin(req.body);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

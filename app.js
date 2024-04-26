const express = require("express");
const pluginRouter = require("./pluginRouter");

const app = express();

// Монтируем маршруты плагина
app.use("/plugin", pluginRouter);

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});

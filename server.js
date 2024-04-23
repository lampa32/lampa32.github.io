const axios = require('axios');
const express = require('express');

const app = express();
const PORT = 3000;

const PLUGIN_URL = 'http://79.137.205.41/full.js'; // Замените на ваш URL плагина

// Middleware для модификации исходного кода плагина
app.use('/full.js', async (req, res, next) => {
    try {
        // Получаем исходный код плагина
        const { data } = await axios.get(PLUGIN_URL);

        // Создаем заглушку
        const placeholderMessage = "console.log('Plugin code is hidden!');";

        // Отправляем заглушку клиенту, но загружаем исходный код плагина на клиенте
        res.type('text/javascript').send(placeholderMessage);
    } catch (error) {
        console.error('Error sending placeholder message:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

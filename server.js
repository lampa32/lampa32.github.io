const express = require('express');
const axios = require('axios');

const app = express();

const PLUGIN_URL = 'http://lampa.run.place/full.js'; // Замените на URL вашего плагина

// Маршрут для обработки запросов к плагину
app.get('/full.js', async (req, res) => {
    try {
        // Получаем исходный код плагина
        const { data } = await axios.get(PLUGIN_URL);

        // Вместо исходного кода плагина можно вставить любой другой код
        const modifiedCode = `console.log('Plugin code is hidden!');`;

        // Отправляем измененный код клиенту
        res.type('text/javascript').send(modifiedCode);
    } catch (error) {
        console.error('Error fetching plugin code:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

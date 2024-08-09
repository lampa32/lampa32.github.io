const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Настройка CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Создание папки для синхронизированных данных, если она не существует
const syncDir = path.join(__dirname, 'lampa', 'sync');
if (!fs.existsSync(syncDir)) {
  fs.mkdirSync(syncDir, { recursive: true });
}

// Увеличиваем лимит размера тела запроса до 50 МБ
app.use(express.json({ limit: '50mb' }));

// Эндпоинт для синхронизации данных
app.post('/lampa/sync', (req, res) => {
  const { token } = req.query;
  const data = req.body;

  // Проверяем, что данные существуют
  if (!data) {
    return res.status(400).json({ error: 'No data provided' });
  }

  // Формируем имя файла с токеном
  const fileName = `sync_${token}.json`;
  const filePath = path.join(syncDir, fileName);

  // Записываем данные в файл
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error saving data' });
    }

    // Возвращаем успешный ответ
    return res.json({ success: true });
  });
});

// Эндпоинт для загрузки синхронизированных данных
app.get('/lampa/sync', (req, res) => {
  const { token } = req.query;
  const fileName = `sync_${token}.json`;
  const filePath = path.join(syncDir, fileName);

  // Читаем данные из файла
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'No data found' });
    }

    // Возвращаем данные
    return res.json({ success: true, data: JSON.parse(data) });
  });
});

app.listen(3003, () => {
  console.log('Server is running on port 3003');
});

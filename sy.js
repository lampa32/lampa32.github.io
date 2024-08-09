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
  const { version = 0 } = data;

  // Формируем имя файла с токеном и версией
  const fileName = `sync_${token}_v${version}.json`;
  const filePath = path.join(syncDir, fileName);

  // Проверяем, существует ли файл с данными
  fs.exists(filePath, (exists) => {
    if (exists) {
      // Читаем существующие данные
      fs.readFile(filePath, 'utf8', (err, existingData) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error reading data' });
        }

        const existingDataObj = JSON.parse(existingData);
        const { version: existingVersion = 0 } = existingDataObj;

        // Если версия клиента меньше версии на сервере, возвращаем данные с сервера
        if (version < existingVersion) {
          return res.json({ success: true, data: existingDataObj, version: existingVersion });
        }

        // Записываем новые данные в файл
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error saving data' });
          }

          return res.json({ success: true });
        });
      });
    } else {
      // Если файла не существует, записываем новые данные
      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error saving data' });
        }

        return res.json({ success: true });
      });
    }
  });
});

// Эндпоинт для загрузки синхронизированных данных
app.get('/lampa/sync', (req, res) => {
  const { token } = req.query;

  // Находим последний файл с данными для этого токена
  const filePattern = new RegExp(`^sync_${token}_v(\\d+).json$`);
  const files = fs.readdirSync(syncDir);
  const latestFile = files.reduce((latest, file) => {
    const match = file.match(filePattern);
    if (match) {
      const version = parseInt(match[1]);
      return version > latest.version ? { file, version } : latest;
    }
    return latest;
  }, { file: null, version: 0 });

  if (latestFile.file) {
    const filePath = path.join(syncDir, latestFile.file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(404).json({ error: 'No data found' });
      }

      const dataObj = JSON.parse(data);
      return res.json({ success: true, data: dataObj, version: latestFile.version });
    });
  } else {
    return res.status(404).json({ error: 'No data found' });
  }
});

app.listen(3003, () => {
  console.log('Server is running on port 3003');
});

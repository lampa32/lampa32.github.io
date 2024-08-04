const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3002;

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Путь к файлу для хранения данных о времени просмотра
const timecodeFilePath = path.join(__dirname, 'lampa', 'timeline', 'timecodes.json');

// Функция для чтения данных из файла
function readTimecodes() {
  try {
    const data = fs.readFileSync(timecodeFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading timecodes:', err);
    return {};
  }
}

// Функция для записи данных в файл
function writeTimecodes(timecodes) {
  try {
    fs.writeFileSync(timecodeFilePath, JSON.stringify(timecodes, null, 2));
  } catch (err) {
    console.error('Error writing timecodes:', err);
  }
}

// Обработчик GET-запроса на получение всех данных о времени просмотра
app.get('/lampa/timeline/all', (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const timecodes = readTimecodes();
  res.json(timecodes);
});

// Обработчик POST-запроса на добавление данных о времени просмотра
app.post('/lampa/timeline/add', (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const { id, data } = req.body;
  if (!id || !data) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  const timecodes = readTimecodes();
  timecodes[id] = data;
  writeTimecodes(timecodes);

  res.json({ message: 'Timecode added successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

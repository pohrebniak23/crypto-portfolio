/* eslint-disable import/no-unresolved */
const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

// Задержка выполнения запросов
server.use(async (req, res, next) => {
  await new Promise((response) => {
    setTimeout(response, 800);
  });

  next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'),
  );
  const { users } = db;

  const userFromBd = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (userFromBd) {
    return res.json(userFromBd);
  }

  return res.status(403).json({ message: 'Auth error' });
});

// Проверка авторизован ли пользователь
// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Auth error' });
  }

  next();
});

server.use(router);

// Запускаем сервер
server.listen(9000, () => {
  console.log('JSON Server is running');
});

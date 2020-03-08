const { allowedDomains } = require('../config');


const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000'
];

app.use(function(req, res, next) {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) { // Проверяем, что значение origin есть среди разрешённых доменов
      res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});


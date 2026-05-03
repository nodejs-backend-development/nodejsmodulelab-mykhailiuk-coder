/*
4. Використовуючи http модуль для Node.js реалізувати:
-клієнтську частину, яка прочитає файл з диску 
і відправить його на сервер перед тим стиснувши за допомогою модуля zlib;
*/ 

const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    method: 'POST',
    headers: { 'Content-Encoding': 'gzip' }
};

const req = http.request(options, (res) => {
    console.log(`Статус: ${res.statusCode}`);
});

const filePath = path.join(__dirname, 'test.txt');

if (fs.existsSync(filePath)) {
    fs.createReadStream(filePath)
      .pipe(zlib.createGzip())
      .pipe(req);
} else {
    console.error('Помилка: Файл test.txt не знайдено!');
}
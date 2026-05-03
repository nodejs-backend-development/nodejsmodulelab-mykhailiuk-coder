/*
4. Використовуючи http модуль для Node.js реалізувати:
-серверну частину, яка приймає файл з клієнта, 
розтискає його і записує в певне місце на локальному диску.
*/ 

const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const server = http.createServer((req, res) => {
    const outputPath = path.join(__dirname, 'received_file.txt');
    const writeStream = fs.createWriteStream(outputPath);

    console.log('Отримання та розпакування файлу...');

    req.pipe(zlib.createGunzip())
       .pipe(writeStream)
       .on('finish', () => {
           console.log('Файл успішно збережено.');
           res.writeHead(201, { 'Content-Type': 'text/plain' });
           res.end('File uploaded and decompressed successfully');
       })
       .on('error', (err) => {
           console.error('Помилка сервера:', err);
           res.writeHead(500);
           res.end('Server Error');
       });
});

server.listen(3000, () => {
    console.log('Сервер чекає на файл на http://localhost:3000');
});
/*
1. Використовуючи http модуль для Node.js реалізувати серверну частину, 
яка отримує запити від клієнта, перевіряє наявність у запиті Authorization header 
(його значенням повинен бути наступний рядок 
“Bearer ekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM”) 
і повертає клієнту response зі статусом 200 у випадку якщо Authorization header присутній 
у request і містить відповідне значення, в іншому випадку статус response повинен бути 401.
*/ 

const http = require('http');

const VALID_TOKEN = "Bearer ekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM";

const server = http.createServer((req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader === VALID_TOKEN) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Authorized" }));
    } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Unauthorized" }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
// CODE MODULE
const http = require('http');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const requestHandler = require('./user')

const app = express();

app.use((req, res, next) => {
    console.log(`Came in first middleware: ${req.url} ${req.method}`);
    next();
})

app.use((req, res, next) => {
    console.log(`Came in second middleware: ${req.url} ${req.method}`);
})

const server = http.createServer(app);

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
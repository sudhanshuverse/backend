const http = require('http');
const calculator = require('./calculator');

const server = http.createServer(calculator)

server.listen(8000, () => {
    console.log("Server Running...");
})
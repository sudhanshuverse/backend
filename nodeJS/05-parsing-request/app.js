const userRequestHandler = require('./user');
const http = require('http');

const server = http.createServer(userRequestHandler);

server.listen(8000, () => {
    console.log("Server Running...");
});
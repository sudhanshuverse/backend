const http = require("http");
const requestHandler = require('./user');

const server = http.createServer(requestHandler);

const PORT = 8000;
server.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})
const http = require('http');

const server = http.createServer((req, res) => {

    if(req.url === '/favicon.ico'){
        return res.end();
    }

    console.log("Hello, How are you.");
    res.end("<h1>Hello, How are you.</h1>")
})


const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
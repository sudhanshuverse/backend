const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.statusCode = 204;
        return res.end();
    }
    res.end("<h1>Hello, How are you.</h1>")
    console.log("URL", req.url);
    console.log("Response", req.method);
    console.log("Headers ",req.headers);

})

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
const http = require("http");
const { url } = require("inspector");

const server = http.createServer((req, res) => {
    console.log("URL: ", req.url);
    console.log("Methods: ", req.method);
    console.log("Headers: ", req.headers);

    switch (req.url) {
        case "/": {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Home Page</title></head>');
            res.write('<body><h1>Home Page</h1></body>');
            res.write('</html>');
            break;
        }
        case "/about": {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>About Page</title></head>');
            res.write('<body><h1>About Page</h1></body>');
            res.write('</html>');
            break;
        }
        case "/products": {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Products Page</title></head>');
            res.write('<body><h1>Products Page</h1></body>');
            res.write('</html>');
            break;
        }
        default:
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Default Page</title></head>');
            res.write('<body><h1>Default Page</h1></body>');
            res.write('</html>');
            res.end();
    }
})

server.listen(8000, () => {
    console.log("Server Running...");
})
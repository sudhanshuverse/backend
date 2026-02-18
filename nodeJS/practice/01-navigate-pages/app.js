const http = require('http');

const server = http.createServer((req, res) => {
    console.log("URL: ", req.url);
    console.log("Methods: ", req.method);
    console.log("Headers: ", req.headers);

    res.setHeader("Content-Type", "text/html");

    res.write("<html>");
    res.write("<head><title>Home Page</title></head>")
    res.write("<body>");

    res.write("<a href='/'>Home</a><br>");
    res.write("<a href='/men'>Men</a><br>");
    res.write("<a href='/women'>Women</a><br>");
    res.write("<a href='/kids'>Kids</a><br>");
    res.write("<a href='/cart'>Cart</a><br>");

    if (req.url === '/') {
        res.write("<h1>Home Page</h1>");
        return res.end();
    } else if (req.url === '/men') {
        res.write("<h1>Men Page</h1>");
        return res.end();
    } else if (req.url === '/women') {
        res.write("<h1>Women Page<h1>");
        return res.end();
    } else if (req.url === '/kids') {
        res.write("<h1>Kids Page</h1>");
        return res.end();
    } else if (req.url === '/cart') {
        res.write("<h1>Cart Page</h1>");
        return res.end();
    } else {
        res.write("Default page")
        return res.end();
    }

    res.write("</body>");
    res.write("</html>");
})


server.listen(8000, () => {
    console.log("Server Running...");
});
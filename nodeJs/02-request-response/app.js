const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.statusCode = 204;
        return res.end();
    }
    console.log("URL", req.url);
    console.log("Response", req.method);
    console.log("Headers ", req.headers);

    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/submit-details') {
        res.write(`
        <head>
            <title>Submit Page</title>
        </head>
        <body>
            <h1>I am from submit details page.</h1>
        </body>`)
    } else if (req.url === '/men') {
        res.write(`
        <head>
            <title>Men section</title>
        </head>
        <body>
            <h1>I am from men section.</h1>
        </body>`)
    } else if (req.url === '/women') {
        res.write(`
        <head>
            <title>Women section</title>
        </head>
        <body>
            <h1>I am from women section.</h1>
        </body>`)
    }

    if (req.url === '/')
        res.write(`<h1>Welcome to Home page</h1>`);
    res.write(`<form action="/submit-details" method="POST">`);
    res.write(`<input type="text" id="name" name="name" placeholder="Enter your name" /><br><br>`);
    res.write(`<label for="gender">Gender :</label>`);
    res.write(`<input type="radio" id="male" name="gender" value="male" />`);
    res.write(`<label for="male">Male</label>`);
    res.write(`<input type="radio" id="female" name="gender" value="female" />`);
    res.write(`<label for="female">Female</label><br><br>`);
    res.write(`<button type="submit">Submit</button>`);
    res.write(`</form>`);
    return res.end();

});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
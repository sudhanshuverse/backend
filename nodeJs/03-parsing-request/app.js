// 1. Read data in the form of chunk and then parse into in readable string
// const fs = require('fs');

// fs.readFile('sample.txt', (error, data) => {
//     console.log(data);
//     console.log(data.toString()); 
// })



// 2. Read the data from the form
const http = require('http');

const server = http.createServer((req, res) => {
    console.log("URL:", req.url);
    console.log("Method: ", req.method);
    if (req.url === '/') {
        res.write("<h1>Home page</h1>")
        res.write(`
            <form action="/submit-details" method="POST">
                <label for="name" value="name">Name: </label>
                <input type="text" placeholder="Username" id="name" name="username" required/><br><br>
                <label>Age: </label>
                <input id="male" value="male" type="radio" name="age"/>
                <label for="male">Male: </label>
                <input type="radio" id="female" name="age" value="female"/>
                <label for="female">Female:</label> <br><br>
                <button>Submit</button>
            </form>
            `)
        res.end();
    } else if (req.url === '/about') {
        res.write("<h1>About page</h1>")
        res.end();
    } else if (req.url === '/contact') {
        res.write("<h1>Contact page</h1>")
        res.end();
    } else if (req.url === '/submit-details' && req.method == "POST") {
        res.write("<h1>Submit Details<h1>")
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        req.on("end", () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
        })
        res.end();
    } else {
        res.write("<h1>This is default page</h1>")
        res.end();
    }
})

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
})
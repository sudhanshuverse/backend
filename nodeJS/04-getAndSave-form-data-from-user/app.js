const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log("URL: ", req.url);
    console.log("Method: ", req.method);
    console.log("Headers: ", req.headers);

    if (req.url === '/') {
        res.write("<html>");
        res.write("<head><title>Home Page</title></head>");
        res.write("<body>");
        res.write("<h1>Home Page</h1>");
        res.write("<h1>Enter Your Details: </h1>");
        res.write("<form action='/submit-details' method='POST'>");
        res.write("<input type='text' name='username' placeholder='Enter your name'><br>")
        res.write("<label for='gender'>Gender: <label>");
        res.write("<input type='radio' id='male' name='gender' value='male'/>");
        res.write("<label for='male'>Male</label>");
        res.write("<input type='radio' id='female' name='gender' value='female'/>");
        res.write("<label for='female'>Female</label><br>");
        res.write("<input type='submit' value='submit' />");
        res.write("</form>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
    else if (req.url === '/about') {
        res.write("<html>");
        res.write("<head><title>About Page</title></head>");
        res.write("<body>");
        res.write("<h1>About Page</h1>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
    else if (req.url === '/products') {
        res.write("<html>");
        res.write("<head><title>Products Page</title></head>");
        res.write("<body>");
        res.write("<h1>Products Page</h1>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
    else if (req.url.toLowerCase() === '/submit-details' && req.method == 'POST') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            let username = body.replace('username=', '').split('&')[0].replace(/\+/g, ' ');
            let gender = body.split('gender=')[1];
            fs.writeFileSync('userData.txt', 'Name = ' + username + ', Gender = ' + gender);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    }
    else {
        res.write("<html>");
        res.write("<head><title>Default Page</title></head>");
        res.write("<body>");
        res.write("<h1>Default Page</h1>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
})

server.listen(8000, () => {
    console.log("Server Running...");
});
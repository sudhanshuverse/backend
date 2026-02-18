const fs = require('fs');

const userRequestHandler = (req, res) => {
    console.log("URL: ", req.url);
    console.log("Method: ", req.method);
    // console.log("Headers: ", req.headers);

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
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })

        req.on('end', () => {
            const fullBody = Buffer.concat(body).toString();
            console.log(fullBody);
            const params = new URLSearchParams(fullBody);
            // const bodyObject = {}; 
            // for(const [key, val] of params.entries()) {
            //     bodyObject[key] = val;
            // }
            const bodyObject = Object.fromEntries(params);
            console.log(bodyObject);
            fs.writeFileSync('user.txt', JSON.stringify(bodyObject));
            res.end();
        })

        res.statusCode = 302;
        res.setHeader('Location', '/');
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
}


module.exports = userRequestHandler;
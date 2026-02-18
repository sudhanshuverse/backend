const calculator = (req, res) => {

    console.log("URL: ", req.url);
    console.log("Method: ", req.method);
    console.log("Header: ", req.headers);
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url === '/') {
        res.write("<html>");
        res.write("<head><title>Home Page</title></head>");
        res.write("<body>");
        res.write("<h1>Welcome to home page</h1>")
        res.write("<a href='/calculator'>Calculator</a>")
        res.write("</body>");
        res.write("</html>");
        res.end();
    }

    else if (req.url === '/calculator') {
        res.write("<html>");
        res.write("<head><title>Calculator Page</title></head>");
        res.write("<body>");
        res.write("<h1>Calculator page</h1>");
        res.write("<form action='/calculate-result' method='POST'>");
        res.write("<label for='first-number'>First Number: </label>")
        res.write("<input id='first-number' name='first-number' type='number'placeholder='Enter the first number'/><br>")
        res.write("<label for='second-number'>Second Number: </label>")
        res.write("<input id='second-number' name='second-number' type='number'placeholder='Enter the second number'/><br>")
        res.write("<button type='submit'>Submit</button>")
        res.write("</form>");
        res.write("<a href='/'>Home</a>");
        res.write("</body>");
        res.write("</html>");
        res.end();
    }

    else if (req.url === '/calculate-result' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        })

        req.on('end', () => {
            const fullBody = Buffer.concat(body).toString();
            const params = new URLSearchParams(fullBody);
            const bodyObject = Object.fromEntries(params);

            const firstNumber = Number(bodyObject['first-number']);
            const secondNumber = Number(bodyObject['second-number']);
            const sum = firstNumber + secondNumber;

            console.log(bodyObject);
            res.write("<html>");
            res.write("<head><title>Result Page</title></head>");
            res.write("<body>");
            res.write("<h1>Result Page </h1>");
            res.write(`<h2>First Number: ${firstNumber}</h2>`)
            res.write(`<h2>Second Number: ${secondNumber}</h2>`)
            res.write(`<h2>Sum: ${sum}</h2>`)
            res.write("</body>");
            res.write("</html>");
            res.end();
        })

    }
}


module.exports = calculator;
const userRequestHandler = (req, res) => {
    console.log("URL:", req.url);
    console.log("Method: ", req.method);
    if (req.url === '/') {
        res.write("<h1>Home page</h1>")
        res.write(`
            <form action="/submit-details" method="POST">
                <label for="name" value="name">Name: </label>
                <input type="text" placeholder="Username" id="name" name="username" required/><br><br>
                <label>Gender: </label>
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
        // this array will store small pieces (chunks) of incoming data
        const body = [];
        // "data" event runs again and again
        // every time a small piece of request body arrives from browser
        req.on('data', (chunk) => {
            console.log(chunk);     // raw Buffer data (binary)
            body.push(chunk);       // store each chunk
        })
        // "end" event runs once
        // it means browser has finished sending all data
        req.on("end", () => {
            // combine all chunks into one Buffer
            // then convert buffer -> readable string
            const parseBody = Buffer.concat(body).toString();
            // convert: username=ram&age=male  into readable key/value form
            const normalData = new URLSearchParams(parseBody);
            // create normal JavaScript object
            const jsonObject = {};
            for (const [key, value] of normalData.entries()) {
                jsonObject[key] = value;
            }
            // now we finally have full data from form
            // write it into a file
            fs.writeFile('sample.txt', JSON.stringify(jsonObject), (err) => {
                if (err) {
                    console.log("Error:", err);
                    res.end("Failed");
                    return;
                }
                console.log("Saved in file!");
            });
        });
    } else {
        res.write("<h1>This is default page</h1>")
        res.end();
    }
};

module.exports = userRequestHandler;
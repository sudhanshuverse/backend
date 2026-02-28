// EXTERNAL MODULE
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Path: ${req.url}`);
    next();
})

app.use((req, res, next) => {
    console.log(`Method: ${req.method}`);
    next();
})

app.get("/", (req, res) => {
    res.send("<h1>Welcome Home.</h1>")
})

app.get("/contact-us", (req, res) => {
    res.send(`
        <form action="/contact-us" method="POST">
            <label for="name">Name: </label>
            <input type="text" id="name" name="name" placeholder="Enter your name"/><br>
            <label for="email">Email: </label>
            <input type="email" id="email" name="email" placeholder="Enter your email"/><br>
            <button>Submit</button>
        </form>
        `)
})

app.post('/contact-us', (req, res) => {
    console.log(req.body);
    res.send("<h1>Form successfully submitted.</h1>")
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})
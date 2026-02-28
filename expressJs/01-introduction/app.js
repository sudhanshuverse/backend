// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const requestHandler = require('./user')

const app = express();

app.get("/", (req, res, next) => {
    console.log(`Came in first middleware: ${req.url} ${req.method}`);
    // res.send("<h1>Came in first middleware.</h1>")
    next();
});

app.post("/submit-details", (req, res, next) => {
    console.log(`Came in second middleware: ${req.url} ${req.method}`);
    res.send("<h1>This is second middleware.</h1>");
});

app.use("/", (req, res, next) => {
    console.log(`Came in another middleware: ${req.url} ${req.method}`);
    res.send("<h1>Came in another middleware.</h1>")
});



const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
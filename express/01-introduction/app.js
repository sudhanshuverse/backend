// /Core Module
const express = require('express');

// Local Module
const requestHandler = require('./user');

const app = express();

app.use("/", (req, res, next) => {
    console.log("Came in first middleware", req.url, req.method);
    // res.send('<h1 style="color:skyblue">Came from first middleware</h1>')
    next();
})

app.post("/submit-details", (req, res, next) => {
    console.log("Came in second middleware", req.url, req.method);
    res.send('<h1 style="color:skyblue">Welcome to complete coding.</h1>')
})

app.use("/", (req, res, next) => {
    console.log("Came in another middleware", req.url, req.method);
    res.send('<h1 style="color:skyblue">Came from another middleware</h1>')
})



const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server Running... on address http://localhost:${PORT}`);
})
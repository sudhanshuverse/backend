// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const rootDir = require('../utils/pathUtil');

const contactRouter = express.Router();

contactRouter.get("/contact-us", (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'))
})

contactRouter.post('/contact-us', (req, res) => {
    console.log(req.body);
    res.sendFile(path.join(rootDir, 'views', 'contact-success.html'))
})

module.exports = contactRouter;
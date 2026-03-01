// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const rootDir = require('../utils/pathUtil');

const homeRoute = express.Router();

homeRoute.get("/", (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'home.html'))
})


module.exports = homeRoute;

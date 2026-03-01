// CORE MODULE
const path  = require("path");

// EXTERNAL MODULE
const express = require('express');
const userRouter = express.Router();

// LOCAL MODULE
const rootDir = require('../utils/pathUtil');

userRouter.get("/", (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'home.html'));
})

module.exports = userRouter
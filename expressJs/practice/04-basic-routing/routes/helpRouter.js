// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const rootDir = require('../utils/pathUtil');

const helpRouter = express();

helpRouter.use('/help', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'help.html'));
})

module.exports = helpRouter;
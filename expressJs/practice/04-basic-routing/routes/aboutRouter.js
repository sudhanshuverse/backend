// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const rootDir = require('../utils/pathUtil');

const aboutRouter = express();

aboutRouter.use('/about', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'about.html'));
})

module.exports = aboutRouter;
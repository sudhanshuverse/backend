// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const rootDir = require('../utils/pathUtil');

const contactRouter = express();

contactRouter.use('/contact', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
})

module.exports = contactRouter;
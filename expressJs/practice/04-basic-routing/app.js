// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const homeRouter = require('./routes/homeRouter');
const aboutRouter = require('./routes/aboutRouter');
const contactRouter = require('./routes/contactRouter');
const helpRouter = require('./routes/helpRouter');
const rootDir = require('./utils/pathUtil');

const app = express();

app.use(homeRouter);
app.use(aboutRouter);
app.use(contactRouter);
app.use(helpRouter);

app.use((req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', '404.html'));
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
})
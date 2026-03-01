// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const homeRouter = require('./routes/homeRouter');
const contactRouter = require('./routes/contactRouter');
const rootDir = require('./utils/pathUtil');

const app = express();

app.use(express.urlencoded());

app.use(homeRouter);
app.use(contactRouter);

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(rootDir, 'views', '404.html'));
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
})
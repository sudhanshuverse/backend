// CORE MODULE
const path = require('path')

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');

const app = express();

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
    res.status(404);
    res.sendFile(path.join(rootDir, 'views', '404.html'));
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
})
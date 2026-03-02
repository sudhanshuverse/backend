// CORE MODULE
const path = require('path')

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const userRouter = require('./routes/userRouter');
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    res.status(404);
    res.render('404', {pageTitle: 'Page Not Found'})
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
})
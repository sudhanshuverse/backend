// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const { ErrorPage } = require('./controllers/error');
const { mongoConnect } = require('./utils/databaseUtil');
// require('./utils/databaseUtil');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')));

app.use(ErrorPage)

const PORT = 8000;
mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on: http://localhost:${PORT}`);
    })
})
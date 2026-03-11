// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');

// LOCAL MODULE
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const { ErrorPage } = require('./controllers/error');
const { default: mongoose } = require('mongoose');

const app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(ErrorPage)


const PORT = 8000;
const DB_PATH = "mongodb://sudhanshu1:coding12345@ac-ixqd2yz-shard-00-00.8bpirzw.mongodb.net:27017,ac-ixqd2yz-shard-00-01.8bpirzw.mongodb.net:27017,ac-ixqd2yz-shard-00-02.8bpirzw.mongodb.net:27017/airbnb?ssl=true&replicaSet=atlas-s0hxc6-shard-0&authSource=admin&appName=FirstCluster";

mongoose.connect(DB_PATH).then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
        console.log(`Server is running on: http://localhost:${PORT}`);
    })
}).catch(err => {
    console.log('Error while connected to mongo: ', err);
})
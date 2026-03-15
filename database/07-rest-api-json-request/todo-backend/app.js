// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const DB_PATH = "mongodb://sudhanshu1:coding12345@ac-ixqd2yz-shard-00-00.8bpirzw.mongodb.net:27017,ac-ixqd2yz-shard-00-01.8bpirzw.mongodb.net:27017,ac-ixqd2yz-shard-00-02.8bpirzw.mongodb.net:27017/todo?ssl=true&replicaSet=atlas-s0hxc6-shard-0&authSource=admin&appName=FirstCluster";

// LOCAL MODULE
const errorsController = require('./controllers/errors');
const todoItemsRouter = require('./routes/todoItemsRouter');
const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter)


app.use(errorsController.pageNotFound);

const PORT = 8000;
mongoose.connect(DB_PATH)
  .then(() => {
    console.log('Connected to Mongo');
    app.listen(PORT, () => {
      console.log(`Server is running on address http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.log('Error while connecting to Mongo', err);
  })
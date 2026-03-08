// const mongoose = require("mongoose");

// async function mongoConnect() {
//   try {
//     await mongoose.connect("mongodb://sudhanshu1:coding12345@ac-fhkeitf-shard-00-00.849qspp.mongodb.net:27017,ac-fhkeitf-shard-00-01.849qspp.mongodb.net:27017,ac-fhkeitf-shard-00-02.849qspp.mongodb.net:27017/?ssl=true&replicaSet=atlas-525nqb-shard-0&authSource=admin&appName=conding12345");
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.log("MongoDB connection error:", err);
//   }
// }
// mongoConnect()


const mongo = require('mongodb');

const MangoClient = mongo.MongoClient;

const MONGO_URL = "mongodb://sudhanshu1:coding12345@ac-yjko65j-shard-00-00.nxmlcg2.mongodb.net:27017,ac-yjko65j-shard-00-01.nxmlcg2.mongodb.net:27017,ac-yjko65j-shard-00-02.nxmlcg2.mongodb.net:27017/?ssl=true&replicaSet=atlas-zecbrs-shard-0&authSource=admin&appName=CompleteCoding";

let _db;

const mongoConnect = (callback) => {
  MangoClient.connect(MONGO_URL)
    .then(client => {
      console.log("Server is running...");
      callback();
      _db = client.db('airbnb');
    }).catch(err => {
      console.log('Error while connecting Mongo: ', err);
    })
}

const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected')
  }
  return _db;
}



exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
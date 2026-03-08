const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  houseName: String,
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
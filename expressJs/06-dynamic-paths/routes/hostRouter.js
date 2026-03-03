// EXTERNAL MODULE
const express = require("express");
const hostRouter = express.Router();

// LOCAL MODULE
const hostController = require('../controllers/hostController');

hostRouter.get("/add-home", hostController.getAddHome)
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/host-home-list", hostController.getHostHome);

module.exports = hostRouter;

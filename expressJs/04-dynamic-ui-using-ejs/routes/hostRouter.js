// CORE MODULE
const path = require('path');

// EXTERNAL MODULE
const express = require("express");
const hostRouter = express.Router();

// LOCAL MODULE
const rootDir = require('../utils/pathUtil');


hostRouter.get("/add-home", (req, res, next) => {
    res.render('addHome', { pageTitle: 'Add Home' });
})

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
    const { houseName, location, price, rating, photo } = req.body;
    const home = { houseName, location, price, rating, photo };
    registeredHomes.push(home);
    res.render("homeAdded", { pageTitle: "Home Added Successfully" });
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;

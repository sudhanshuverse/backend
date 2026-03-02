// CORE MODULE
const path = require("path");

// EXTERNAL MODULE
const express = require('express');
const userRouter = express.Router();

// LOCAL MODULE
const { registeredHomes } = require('./hostRouter');

userRouter.get("/", (req, res, next) => {
    console.log(registeredHomes);
    res.render('home', { registeredHomes: registeredHomes, pageTitle: 'airbnb Home' });
})

module.exports = userRouter
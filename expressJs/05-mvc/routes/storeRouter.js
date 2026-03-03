const express = require('express');
const storeRouter = express.Router();

const homesController = require('../controllers/storeController');

storeRouter.get("/", homesController.getIndex);
storeRouter.get("/homes", homesController.getHomes);
storeRouter.get("/bookings", homesController.getBookings);
storeRouter.get("/favourites", homesController.getFavoriteList);

module.exports = storeRouter;
const Home = require('../models/home');

exports.getIndex = (req, res) => {
    Home.fetchAll(registeredHomes => {
        res.render("store/index", {
            registeredHomes: registeredHomes,
            pageTitle: "airbnb Home"
        });
    });
};

exports.getHomes = (req, res) => {
    Home.fetchAll(registeredHomes => {
        res.render("store/home-list", {
            registeredHomes: registeredHomes,
            pageTitle: "Home List"
        });
    });
};

exports.getBookings = (req, res) => {
    res.render("store/bookings", {
        pageTitle: "My Bookings"
    });
};

exports.getFavoriteList = (req, res) => {
    Home.fetchAll(registeredHomes => {
        res.render("store/favourite-list", {
            registeredHomes: registeredHomes,
            pageTitle: "airbnb Home"
        });
    });
};
const Home = require('../models/home');

exports.getAddHome = (req, res) => {
    res.render('host/addHome', { pageTitle: 'Add Home' });
};

exports.getHostHome = (req, res) => {
    Home.fetchAll(registeredHomes => {
        res.render("host/host-home-list", {
            registeredHomes: registeredHomes,
            pageTitle: "Host-homes"
        });
    });
};

exports.postAddHome = (req, res) => {
    const { houseName, location, price, rating, photo } = req.body;
    const home = new Home(houseName, location, price, rating, photo);
    home.save();
    res.render("host/home-added", { pageTitle: "Home Added Successfully" });
};

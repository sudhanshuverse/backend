const Home = require('../models/home');

exports.getAddHome = (req, res) => {
    res.render('host/edit-home', {
        pageTitle: 'Add Home to airbnb',
        editing: false,
    });
};

exports.getEditHome = (req, res) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId)
        .then(home => {
            if (!home) {
                console.log("Home not found for editing");
                return res.redirect("/host/host-home-list");
            }
            console.log(homeId, editing, home);
            res.render('host/edit-home', {
                home: home,
                pageTitle: 'Edit Your Home',
                editing: editing,
            });
        })
};

exports.getHostHome = (req, res) => {
    Home.find().then(registeredHomes => {
        res.render("host/host-home-list", {
            registeredHomes: registeredHomes,
            pageTitle: "Host-homes"
        });
    });
};

exports.postAddHome = (req, res) => {
    const { houseName, location, price, rating, photoUrl, description } = req.body;
    const home = new Home({ houseName, location, price, rating, photoUrl, description });
    home.save().then(() => {
        console.log("Home saved successfully");
    });
    res.redirect("/host/host-home-list");
};


exports.postEditHome = (req, res) => {
    const { id, houseName, location, price, rating, photoUrl, description } = req.body;
    Home.findById(id)
        .then((home) => {
            home.houseName = houseName;
            home.location = location;
            home.price = price;
            home.rating = rating;
            home.photoUrl = photoUrl;
            home.description = description;
            home.save().then(result => {
                console.log("Home Updated:", result);
            }).catch(err => {
                console.log("Error while updating: ", err);
            })
            res.redirect("/host/host-home-list");
        }).catch(err => {
            console.log("Error while finding home", err);
        })
};


exports.postDeleteHome = (req, res) => {
    const homeId = req.params.homeId;
    console.log("Came to delete:", homeId);
    Home.findByIdAndDelete(homeId)
        .then(() => {
            res.redirect("/host/host-home-list");
        }).catch(error => {
            console.log('Error while deleting: ', error);
        })
};

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
        .then(([homes]) => {
            const home = homes[0];
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
    Home.fetchAll().then(([registeredHomes]) => {
        res.render("host/host-home-list", {
            registeredHomes: registeredHomes,
            pageTitle: "Host-homes"
        });
    });
};

exports.postAddHome = (req, res) => {
    const { houseName, location, price, rating, photoUrl, description } = req.body;
    const home = new Home(houseName, location, price, rating, photoUrl, description);
    home.save();
    res.redirect("/host/host-home-list");
};


exports.postEditHome = (req, res) => {
    const { id, houseName, location, price, rating, photoUrl, description } = req.body;
    const home = new Home(houseName, location, price, rating, photoUrl, description, id);
    home.save();
    res.redirect("/host/host-home-list");
};


exports.postDeleteHome = (req, res) => {
    const homeId = req.params.homeId;
    console.log("Came to delete:", homeId);
    Home.deleteById(homeId)
        .then(() => {
            res.redirect("/host/host-home-list");
        }).catch(error => {
            console.log('Error while deleting: ', error);
        })
};

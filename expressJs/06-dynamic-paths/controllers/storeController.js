const Favourite = require('../models/favourites');
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
    Favourite.getFavourites(favourites => {
        Home.fetchAll(registeredHomes => {
            const favouriteHomes = registeredHomes.filter(home =>
                favourites.includes(home.id));
            res.render("store/favourite-list", {
                favouriteHomes: favouriteHomes,
                pageTitle: "Favourites"
            });
        });
    });
};

exports.postAddToFavorite = (req, res, next) => {
    console.log("Came to add to favorite: ", req.body);
    Favourite.addToFavourite(req.body.id, error => {
        if (error) {
            console.log("Error while marking favourite");
        }
        res.redirect('/favourites');
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    Favourite.deleteById(homeId, error => {
        if (error) {
            console.log("Error while removing from : ", error);
        }
        res.redirect('/favourites');
    })
};


exports.getHomeDetails = (req, res) => {
    const homeId = req.params.homeId;
    Home.fetchAll(homes => {
        const home = homes.find(h => h.id === homeId);
        res.render("store/home-detail", {
            home: home,
            pageTitle: "Home Details"
        });
    });
};

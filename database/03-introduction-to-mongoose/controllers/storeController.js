const Favourite = require('../models/favourites');
const Home = require('../models/home');

exports.getIndex = (req, res) => {
    Home.fetchAll().then(registeredHomes => {
        res.render("store/index", {
            registeredHomes: registeredHomes,
            pageTitle: "airbnb Home"
        });
    })
};

exports.getHomes = (req, res) => {
    Home.fetchAll().then(registeredHomes => {
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
    Favourite.getFavourites().then(favourites => {
        favourites = favourites.map(fav => fav.houseId);
        Home.fetchAll().then(registeredHomes => {
            console.log(favourites, registeredHomes);
            const favouriteHomes = registeredHomes.filter(home =>
                favourites.includes(home._id.toString()));
            res.render("store/favourite-list", {
                favouriteHomes: favouriteHomes,
                pageTitle: "Favourites"
            });
        });
    });
};

exports.postAddToFavorite = (req, res, next) => {
    const homeId = req.body.id;
    const fav = new Favourite(homeId);
    fav.save()
        .then(result => {
            console.log('Fav added', result);
        }).catch(err => {
            console.log('Error while marking favourite', err);
        }).finally(() => {
            res.redirect('/favourites');
        })
};

exports.postRemoveFromFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    Favourite.deleteById(homeId)
        .then(result => {
            console.log('Fav removed', result);
        }).catch(err => {
            console.log('Error while removing favourite', err);
        }).finally(() => {
            res.redirect('/favourites');
        })
};


exports.getHomeDetails = (req, res) => {
    const homeId = req.params.homeId;
    Home.findById(homeId)
        .then(home => {
            if (!home) {
                console.log("Home not found");
                res.redirect("/homes");
            } else {
                res.render("store/home-detail", {
                    home: home,
                    pageTitle: "Home Detail",
                })
            }
        })
};

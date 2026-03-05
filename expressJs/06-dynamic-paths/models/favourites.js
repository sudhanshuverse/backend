const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const favouriteDataPath = path.join(rootDir, 'data', 'favourite.json');

module.exports = class Favourite {

    static addToFavourite(homeId, callback) {

        Favourite.getFavourites(favourites => {

            if (favourites.includes(homeId)) {
                console.log("Home is already marked as favourite");
                return callback();
            }

            favourites.push(homeId);

            fs.writeFile(
                favouriteDataPath,
                JSON.stringify(favourites),
                callback
            );
        });
    }

    static getFavourites(callback) {
        fs.readFile(favouriteDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        });
    }

    static deleteById(delhomeId, callback) {
        Favourite.getFavourites(homesIds => {
            homesIds = homesIds.filter(homeId => homeId !== delhomeId)
            fs.writeFile(favouriteDataPath, JSON.stringify(homesIds), callback);
        })
    }
} 
// CORE MODULES
const fs = require('fs');
const path = require('path');

// LOCAL MODULE
const rootDir = require('../utils/pathUtil');
const { error } = require('console');

module.exports = class Home {
    constructor(houseName, location, price, rating, photo) {
        this.houseName = houseName;
        this.location = location;
        this.price = price;
        this.rating = rating;
        this.photo = photo;
    }

    save() {
        Home.fetchAll(registeredHomes => {
            registeredHomes.push(this);
            const homeDataPath = path.join(rootDir, 'data', 'homes.json');
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => { console.log("File Writing Concluded", error); })
        })
    }

    static fetchAll(callback) {
        const homeDataPath = path.join(rootDir, 'data', 'homes.JSON');
        fs.readFile(homeDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        })
    }

}
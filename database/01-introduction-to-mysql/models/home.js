const db = require('../utils/databaseUtil');

module.exports = class Home {
    constructor(houseName, location, price, rating, photoUrl, description, id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.description = description;
        this.id = id;
    }

    save() {
        if (this.id) { // Update
            return db.execute('UPDATE homes SET houseName=?, location=?, price=?, rating=?, photoUrl=?, description=? WHERE id=?',
                [this.houseName, this.location, this.price, this.rating, this.photoUrl, this.description, this.id]);
        } else {  // Insert
            return db.execute('INSERT INTO homes (houseName, location, price, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)',
                [this.houseName, this.location, this.price, this.rating, this.photoUrl, this.description]);
        }
    }

    static fetchAll() {
        return db.execute('SELECT * FROM homes')
    }

    static findById(homeId) {
        return db.execute('SELECT * FROM homes WHERE id=?', [homeId]);
    }

    static deleteById(homeId) {
        return db.execute('DELETE FROM homes WHERE id=?', [homeId]);
    }
}
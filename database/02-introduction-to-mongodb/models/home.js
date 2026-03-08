const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/databaseUtil');

module.exports = class Home {
    constructor(houseName, location, price, rating, photoUrl, description, _id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.description = description;
        if (_id) {
            this._id = _id;
        }
    }

    save() {
        const db = getDB();
        const updateFields = {
            houseName: this.houseName,
            price: this.price,
            location: this.location,
            rating: this.rating,
            photoUrl: this.photoUrl,
            description: this.description
        };
        if (this._id) { //Update
            return db.collection('home').updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateFields });
        } else { //Insert
            return db.collection('home').insertOne(this);
        }
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('home').find().toArray();
    }

    static findById(homeId) {
        const db = getDB();
        return db.collection('home')
            .find({ _id: new ObjectId(String(homeId)) })
            .next();
    }

    static deleteById(homeId) {
        const db = getDB();
        return db.collection('home')
            .deleteOne({ _id: new ObjectId(String(homeId)) })
    }
}
const { getDB } = require("../utils/databaseUtil");

module.exports = class Favourite {

    constructor(houseId) {
        this.houseId = houseId;
    }

    save() {
        const db = getDB();
        return db.collection('favourites').updateOne(
            { houseId: this.houseId },   // search condition
            { $set: { houseId: this.houseId } },
            { upsert: true }             // insert if not found
        );
    }

    static getFavourites() {
        const db = getDB();
        return db.collection('favourites').find().toArray();
    }

    static deleteById(delhomeId) {
        const db = getDB();
        return db.collection('favourites')
            .deleteOne({ houseId: delhomeId })
    }
} 
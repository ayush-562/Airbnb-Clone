const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//connection
main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

// initializtion function
const initDB = async () => {
    // first, empty the db
    await Listing.deleteMany({});
    // add a same owner to our initial data
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6772526bd75d9a18ed0685a1" }));
    // insert initData with key: 'data' --> value: sampleData
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

// function call
initDB();
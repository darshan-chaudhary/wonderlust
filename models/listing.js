let mongoose = require("mongoose");

let schema = mongoose.Schema;

const listingSchema = new schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    image: {
    filename: {
        type: String
    },
    url: {
        type: String
    }
},

    price: Number,
    location: String,
    country: String
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;
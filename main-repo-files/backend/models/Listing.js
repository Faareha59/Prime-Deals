const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    description: String,
    image: String,
    priceRent: String,
    priceBuy: String,
    location: String,
    beds: Number,
    baths: Number,
    propertyType: String, // 'apartment' or 'house'
    features: [String]
});

module.exports = mongoose.model('Listing', listingSchema);

const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema ({
    image: String,
    type : String,
    location: String,
    buy: String,
    rent: String,
    beds: Number,
    baths: Number,
    agent: String,
    description: String,
    features: String,
});

// Explicitly set the collection name to 'properties'
const PropertiesModel = mongoose.model('Properties', propertiesSchema, 'properties');
module.exports = PropertiesModel;

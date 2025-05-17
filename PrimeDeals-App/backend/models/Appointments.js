const mongoose = require('mongoose');

const  appointmentSchema= new mongoose.Schema ({
    firstName: String,
    lastName: String,
       agent: String,
    description: String,
    features: String,
});

// Explicitly set the collection name to 'properties'
const PropertiesModel = mongoose.model('Properties', propertiesSchema, 'properties');
module.exports = PropertiesModel;

// backend/models/user.js
const mongoose = require('mongoose');

    agent: String,
    description: String,
    features: String,
});

// Explicitly set the collection name to 'properties'
const PropertiesModel = mongoose.model('Properties', propertiesSchema, 'properties');
module.exports = PropertiesModel;

const user = mongoose.model('User', userSchema); // Create the model

module.exports = user;

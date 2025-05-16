//collection
const mongoose = require ('mongoose') 

const contactSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    message: { type: String, required: true },
}); //,{collection: 'contctdata'} to prevent pluralization bu moongose
const ContactData = mongoose.model('ContactData', contactSchema);  //For exporting mongoose

module.exports = ContactData; //For exporting mongoose
//The model folder is commonly used to store the data models of your application


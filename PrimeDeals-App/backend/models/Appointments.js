const mongoose = require('mongoose');

const  appointmentSchema= new mongoose.Schema ({
    firstName: String,
    lastName: String,
    email: String,
    purchaseType: {
        type: String,
        enum: ['buy', 'rent'],
        default: 'buy'
    },
    date: Date,
    time: String,
})

const AppointmentModel =  mongoose.model('Appointments', appointmentSchema);
module.exports = AppointmentModel;
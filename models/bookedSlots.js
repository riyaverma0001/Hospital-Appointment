const mongoose = require('mongoose')

const bookedSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: true  
    },
    status: {
        type: String,
        required: true,
        default: 'booked' // by default booked 
    }
})

const Booking = mongoose.model('Booking', bookedSchema);
module.exports = Booking;
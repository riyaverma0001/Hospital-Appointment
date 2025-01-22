const Booking = require('../models/bookedSlots');
const Slot = require('../models/slotSchema');  // Assuming Slot model is imported
const moment = require('moment');

// Fetch dates and time slots
exports.getBookAppointmentPage = async (req, res) => {
    console.log('Book Appointment Page');
    const availableDates = {};
    let message = 'Dates fetched successfully.';
    const timeSlots = [];

    try {
        // Fetch available time slots from slotSchema
        const slots = await Slot.find({ status: 'available' });  // Filter slots by available status
        
        //time slots in a format
        slots.forEach(slot => {
            timeSlots.push({
                _id: slot._id,
                startTime: slot.startTime,
                endTime: slot.endTime
            });
        });

        // 10 days dates
        for (let i = 1; i <= 10; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i); // Increment date by i days
            
            // day, month, and year
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            // Format date as DD-MM-YYYY
            const formattedDate = `${day}-${month}-${year}`;
            availableDates[i] = formattedDate;
        }

        res.render('book-appointment', {
            success: true,
            message: message,
            available_dates: availableDates,
            time_slots: timeSlots
        });
    } catch (error) {
        // Error handling
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching dates and time slots.',
        });
    }
};

exports.postBookAppointment = async (req, res) => {
    console.log('Post appointment route');
    console.log('req.body is:' , req.body);
    
    try {
        const { date, timeSlot } = req.body;

        if (!date || !timeSlot) {
            return res.status(400).send('Date and time slot are required.');
        }

        // Parse the date in DD-MM-YYYY format
        // const parsedDate = moment(date, 'DD-MM-YYYY').toDate();
        // if (!parsedDate || isNaN(parsedDate)) {
        //     return res.status(400).send('Invalid date format.');
        // }

        // Check if the time slot is already booked for the selected date
        const existingBooking = await Booking.findOne({ date: date, timeSlot });
        if (existingBooking) {
            return res.status(400).send('The selected time slot is already booked.');
        }

        const booking = new Booking({
            date: date,  
            timeSlot,  
            status: 'booked',  // Default status when booked
        });

        await booking.save();

        res.status(200).send('Appointment successfully booked!');
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).send('An error occurred while booking the appointment.');
    }
}

exports.getAllBookings = async (req, res) => {
    console.log('all bookings display page');
    try {
        const bookings = await Booking.find(); // Fetch all bookings from the database
        res.render('all-bookings', { bookings }); // Pass bookings to the EJS view
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Internal Server Error');
    }
    
}
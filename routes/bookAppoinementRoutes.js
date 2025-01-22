const express = require('express');
const router = express.Router();
const bookAppointmentController = require('../controllers/bookAppointmentController');

// Get all available dates route
router.get('/book-appointment', bookAppointmentController.getBookAppointmentPage);
router.post('/book-appointment', bookAppointmentController.postBookAppointment);

router.get('/all-bookings', bookAppointmentController.getAllBookings);

module.exports = router;

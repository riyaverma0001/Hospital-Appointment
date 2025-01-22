const express = require('express');
const router = express.Router();
const dateController = require('../controllers/dateController');

// Get all available dates route
router.get('/get-available-dates', dateController.getAvailableDates);

module.exports = router;

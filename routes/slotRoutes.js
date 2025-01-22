const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

//slots page route
router.get('/available-slots', slotController.getSlotsPage);

router.post('/add-slot', slotController.PostAddSlots);

router.post('/delete-slot', slotController.PostDeleteSlot);

module.exports = router;
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  startTime: {
    type: String, // start time for slot
    required: true,
  },
  endTime: {
    type: String, // end time for slot
    required: true,
  },
  status: {
    type: String, // "available" or "not-available"
    default: "available",
    enum: ["available", "not-available"],
    required: true,
  },
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
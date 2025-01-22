const Slot = require('../models/slotSchema');

exports.getSlotsPage = async (req, res) => {
    console.log('Slot page');
    
    
    try {
        const slots = await Slot.find(); // Fetch all slots from the database

        // const availableSlots = slots.map(slot => ({
        //     slot: `${slot.startTime} - ${slot.endTime}`,  // You can keep the times as they are in your DB
        //     start_time: slot.startTime,
        //     end_time: slot.endTime
        // }));
        // res.json({
        //     success: true,
        //     timezone: "India",
        //     available_slots: availableSlots
        // });

        res.render('slots', { slots }); // Render slots in frontend
    } catch (error) {
        res.status(500).send('Error fetching slots');
    }
};


// to add slot
exports.PostAddSlots = async (req, res) => {
    console.log('Add Slot route');
    console.log(req.body); 
    const { start_time, end_time, status } = req.body;  // Capture start and end times

    try {
        const newSlot = new Slot({
            startTime: start_time, 
            endTime: end_time, 
            status
        });

        await newSlot.save(); // Save the slot in the database
        res.redirect('/available-slots'); // Redirect to view slots
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error adding slot');
    }
};

// to delete slot
exports.PostDeleteSlot = async (req, res) => {
    console.log('delete slot route');
    const { slotId } = req.body;
    console.log('Slot ID:', slotId);  

    try {
        // Check slot exists
        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).send('Slot not found');
        }

        // delete the slot
        await Slot.findByIdAndDelete(slotId);

        // Redirect 
        res.redirect('/available-slots');
    } catch (error) {
        console.error('Error deleting slot:', error);
        res.status(500).send('Error deleting slot');
    }
};


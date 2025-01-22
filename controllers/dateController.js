exports.getAvailableDates = (req, res) => {
    console.log('Dates page');
    const availableDates = {};
    let message = 'Dates fetched successfully.';  

    try {
        for (let i = 1; i <= 10; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i); // Increment date by i days
            
            //day, month, and year
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            // Format date as DD-MM-YYYY
            const formattedDate = `${day}-${month}-${year}`;
            availableDates[i] = formattedDate;
        }

        // success message
        res.render('dates', {
            success: true,
            message: message,
            available_dates: availableDates
        });
        // res.json({
        //     success: true,
        //     message: message,
        //     available_dates: availableDates
        // });
    } catch (error) {
        // error
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching dates.',
        });
    }
}
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); //  form data
app.use(bodyParser.json());     // json

mongoose.connect('mongodb+srv://riyaavermaa0001:hospitalAppointment@cluster0.lhdd3.mongodb.net/Hospital?retryWrites=true&w=majority&appName=Cluster0');

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

//import
const homeRoutes = require('./routes/homeRoutes')
const slotRoutes = require('./routes/slotRoutes')
const dateRoutes = require('./routes/dateRoutes')
const bookAppointmentRoutes = require('./routes/bookAppoinementRoutes')

app.use('/', homeRoutes);
app.use('/', dateRoutes);
app.use('/', slotRoutes);
app.use('/', bookAppointmentRoutes);

app.listen(port ,()=> {
    console.log(`http://localhost:${port}`);
});
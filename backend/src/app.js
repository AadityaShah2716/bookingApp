const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authroute');
const bookingRoutes = require('./routes/bookingRoute');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes)
module.exports = app;

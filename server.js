require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clinic-booking')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');
const doctorRoutes = require('./routes/doctors');

app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Clinic Booking System API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
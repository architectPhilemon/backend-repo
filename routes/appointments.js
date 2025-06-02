const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.userId })
      .populate('doctor', 'name specialization')
      .sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
});

// Get all appointments for a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient', 'name')
      .sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const { patient, doctor, date, timeSlot, reason } = req.body;

    // Check for existing appointment in the same time slot
    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      timeSlot,
      status: 'scheduled'
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }

    const appointment = new Appointment({
      patient,
      doctor,
      date,
      timeSlot,
      reason
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
});

// Update appointment status
router.put('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
});

// Cancel appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment', error: error.message });
  }
});

module.exports = router; 
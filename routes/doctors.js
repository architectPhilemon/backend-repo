const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isAvailable: true });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error: error.message });
  }
});

// Get doctor's availability
router.get('/:id/availability', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor.availableSlots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availability', error: error.message });
  }
});

// Update doctor's availability
router.put('/:id/availability', async (req, res) => {
  try {
    const { availableSlots } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { availableSlots },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating availability', error: error.message });
  }
});

module.exports = router; 
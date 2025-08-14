const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// GET all trips (populate admin info)
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().populate('admin_id').sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new trip
router.post('/', async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// // POST /trips
// router.post("/", async (req, res) => {
//   try {
//     const trip = new Trip(req.body); // req.body.images is an array of URLs
//     await trip.save();
//     res.status(201).json(trip);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// PUT update trip by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Trip not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE trip by id
router.delete('/:id', async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Trip deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

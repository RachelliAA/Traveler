const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const mongoose = require('mongoose');    // needed for ID validation

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid trip ID" });
    }

    // Fetch trip WITHOUT populate
    const trip = await Trip.findById(id);

    if (!trip) return res.status(404).json({ error: "Trip not found" });

    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// GET all trips (populate admin info)
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().populate('admin_id').sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const trip = await Trip.findOne({ _id: ObjectId(id) })   // if your field is actually "_id"
//       .populate('admin_id');

//     if (!trip) {
//       return res.status(404).json({ error: "Trip not found" });
//     }

//     res.json(trip);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




// GET trips by admin ID
router.get("/admin/:adminId", async (req, res) => {
  const { adminId } = req.params;

  try {
    const trips = await Trip.find({ admin_id: adminId }).sort({ start_date: 1 });
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch trips" });
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

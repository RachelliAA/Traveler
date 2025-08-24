// module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const router = express.Router();

//  Debug log for troubleshooting
router.use((req, res, next) => {
  console.log("Trips route hit:", req.method, req.originalUrl);
  next();
});

// ✅ PAGINATION ROUTE — MUST COME FIRST!
router.get("/ten", async (req, res) => {
  try {
    let { limit = 10, page = 1 } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    if (limit <= 0 || page <= 0) {
      return res.status(400).json({ error: "Invalid pagination parameters" });
    }

    // Fetch paginated trips
    const trips = await Trip.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    // Get total trips count for frontend check
    const total = await Trip.countDocuments();

    res.json({ trips, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// GET all trips (populate admin info just the admins name)
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().populate('admin_id', 'name').sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// ✅ GET ONE TRIP BY trip ID — MUST COME LAST
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid trip ID" });
    }

    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST adds a new trip
router.post('/', async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// updates trip details by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid trip ID" });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json(updatedTrip);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
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

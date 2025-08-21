// const express = require('express');
// const router = express.Router();
// const Trip = require('../models/Trip');
// const mongoose = require('mongoose');    // needed for ID validation
// // 1️⃣ Specific route first
// // router.get("/ten", async (req, res) => {
// //   const limit = Number(req.query.limit) || 5;
// //   const page = Number(req.query.page) || 1;
// //   const skip = (page - 1) * limit;

// //   try {
// //     const trips = await Trip.find().sort({ start_date: 1 }).skip(skip).limit(limit);
// //     const totalCount = await Trip.countDocuments();
// //     res.json({ trips, totalCount });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });
// router.get("/ten", async (req, res) => {
//   try {
//     let limit = Number(req.query.limit);
//     let page = Number(req.query.page);

//     // fallback defaults
//     if (!limit || limit <= 0) limit = 5;
//     if (!page || page <= 0) page = 1;

//     const skip = (page - 1) * limit;

//     const trips = await Trip.find()
//       .sort({ start_date: 1 })
//       .skip(skip)
//       .limit(limit);

//     const totalCount = await Trip.countDocuments();

//     res.json({ trips, totalCount });
//   } catch (err) {
//     console.error("Error in /ten route:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid trip ID" });
//     }

//     // Fetch trip WITHOUT populate
//     const trip = await Trip.findById(id);

//     if (!trip) return res.status(404).json({ error: "Trip not found" });

//     res.json(trip);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });



// // GET all trips (populate admin info just the admins name)
// router.get('/', async (req, res) => {
//   try {
//     const trips = await Trip.find().populate('admin_id', 'name').sort({ createdAt: -1 });
//     res.json(trips);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });






// // GET trips by admin ID
// router.get("/admin/:adminId", async (req, res) => {
//   const { adminId } = req.params;

//   try {
//     const trips = await Trip.find({ admin_id: adminId }).sort({ start_date: 1 });
//     res.json(trips);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch trips" });
//   }
// });

// // POST new trip
// router.post('/', async (req, res) => {
//   try {
//     const trip = await Trip.create(req.body);
//     res.status(201).json(trip);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


// // // POST /trips
// // router.post("/", async (req, res) => {
// //   try {
// //     const trip = new Trip(req.body); // req.body.images is an array of URLs
// //     await trip.save();
// //     res.status(201).json(trip);
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // });

// // PUT update trip by id
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Trip not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // DELETE trip by id
// router.delete('/:id', async (req, res) => {
//   try {
//     await Trip.findByIdAndDelete(req.params.id);
//     res.json({ message: "Trip deleted" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const Trip = require("../models/Trip");
const router = express.Router();

// ✅ Debug log for troubleshooting
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

// ✅ GET ALL TRIPS — fallback if needed
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ONE TRIP BY ID — MUST COME LAST
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

module.exports = router;

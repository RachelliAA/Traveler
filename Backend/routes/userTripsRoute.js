const express = require('express');
const router = express.Router();
const UserTrip = require('../models/UserTrip');
const mongoose = require('mongoose'); 

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user trip ID" });
    }

    const user = await UserTrip.findById(id);

    if (!user) return res.status(404).json({ error: "User trip not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET all travelers of a specific trip
router.get('/trip/:trip_id', async (req, res) => {
  try {
    const { trip_id } = req.params;
    const userTrips = await UserTrip.find({ trip_id })
      .populate("user_id", "name email") // populate only name & email
      .sort({ createdAt: -1 });

    res.json(userTrips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST new user trip
router.post('/', async (req, res) => {

  try {
    const userTrip = await UserTrip.create(req.body);
    res.status(201).json(userTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//delete trip by  id
router.delete('/:id', async (req, res) => {
      console.log("Deleting UserTrip with ID:", req.params.id);

  try {
    await UserTrip.findByIdAndDelete(req.params.id);
    res.json({ message: "USer Trip deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//update by both ids
router.put('/:user_id/:trip_id', async (req, res) => {
  try {
    const { user_id, trip_id } = req.params;
    const { number_of_tickets } = req.body; // pass new ticket count from frontend

    const updated = await UserTrip.findOneAndUpdate(
      { 
        user_id: new mongoose.Types.ObjectId(user_id),
        trip_id: new mongoose.Types.ObjectId(trip_id)
      },
      { $set: { number_of_tickets } }, // update ticket count
      { new: true } // return updated document
    );

    if (!updated) {
      return res.status(404).json({ error: "User trip not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating user trip:", err);
    res.status(400).json({ error: err.message });
  }
});

// GET trips by user_id
router.get('/user/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const userTrips = await UserTrip.find({ user_id: user_id }).sort({ createdAt: -1 });
    res.json(userTrips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//update by userTrip id
router.put('/:id', async (req, res) => {
  try {
    const updated = await UserTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "user trip not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;

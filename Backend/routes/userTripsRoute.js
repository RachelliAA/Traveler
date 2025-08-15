const express = require('express');
const router = express.Router();
const UserTrip = require('../models/UserTrip');
// // GET all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find().sort({ createdAt: -1 });
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// POST new user
router.post('/', async (req, res) => {

  try {
    const userTrip = await UserTrip.create(req.body);
    res.status(201).json(userTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// // PUT update user by id
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "User not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // DELETE user by id
// router.delete('/:id', async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });




module.exports = router;

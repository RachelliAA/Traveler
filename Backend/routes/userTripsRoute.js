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

// // GET trips by admin_id
// router.get('/user/:id', async (req, res) => {
//   try {
//     const trips = await UserTrip.find({ user_id: req.params.id })
//       .populate('user_id')
//       .sort({ createdAt: -1 });

//     if (!trips.length) {
//       return res.status(404).json({ error: 'No trips found for this user' });
//     }

//     res.json(trips);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });







module.exports = router;

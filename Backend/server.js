require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/usersRoute');
const tripRoutes = require('./routes/tripsRoute');
const userTripRoutes = require('./routes/userTripsRoute');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Use routes
    app.use('/api/users', userRoutes);
    app.use('/api/trips', tripRoutes);
    app.use('/api/userTrips', userTripRoutes);


    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Startup error:', err);
    process.exit(1);
  }
}

start();

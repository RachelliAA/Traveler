const mongoose = require('mongoose');
const { Schema } = mongoose;

const userTripSchema = new Schema({
  trip_id: { type: Schema.Types.ObjectId, ref: "Trip" },
  user_id: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model('UserTrip', userTripSchema, 'userTrips');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const tripSchema = new Schema({
    name: String,
    description: String,
    admin_id: { type: Schema.Types.ObjectId, ref: "User" },
    max_tickets: Number,
    num_participants: Number,
    available_tickets: Number,
    price: Number,
    start_date: Date,
    end_date: Date,
    location: {
        type: String,
        enum: ["north", "south", "east", "Jerusalem area", "Tel Aviv area", "Haifa area", "Eilat area"]
    },
    images: [String], // array of URLs
    is_active: { type: Boolean, default: true },
}, { timestamps: true });


module.exports = mongoose.model('Trip', tripSchema, 'trips');
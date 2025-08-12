const mongoose = require('mongoose');
const { Schema } = mongoose;

const tripSchema = new Schema({
    name: String,
    description: String,
    admin_id: { type: Schema.Types.ObjectId, ref: "User" },
    max_tickets: Number,
    num_participants: Number,
    price: Number,
    start_date: Date,
    end_date: Date,
    location: {
        type: String,
        enum: ["north", "south", "east", "Jerusalem area", "Tel Aviv area", "Haifa area", "Eilat area"]
    },
    available_tickets: Number,
    image_base64: String,
    is_active: { type: Boolean, default: true },

}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema, 'trips');


//curl -X POST http://localhost:5000/api/trips -H "Content-Type: application/json" -d "{\"name\":\"Desert Adventure\",\"description\":\"A thrilling desert trip\",\"admin_id\":\"6899b8f64ccfc54642587fc8\",\"max_tickets\":20,\"num_participants\":0,\"price\":150,\"start_date\":\"2025-09-01T00:00:00Z\",\"end_date\":\"2025-09-05T00:00:00Z\",\"location\":\"south\",\"available_tickets\":20,\"image_base64\":\"\",\"is_active\":true}"

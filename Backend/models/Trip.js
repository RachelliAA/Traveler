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
    images: [String], // array of URLs
    travelers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    is_active: { type: Boolean, default: true },
}, { timestamps: true });

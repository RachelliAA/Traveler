const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;


// CORS setup
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Connect to MongoDB (local)
mongoose.connect("mongodb://localhost:27017/travel_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// ==== Mongoose Models ====
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  phone_number: String,
  email: String,
  password: String,
  address: String,
  is_admin: Boolean,
});

const tripSchema = new Schema({
  name: String,
  description: String,
  admin_id: { type: Schema.Types.ObjectId, ref: "User" },
  max_tickets: Number,
  price: Number,
});

const userTripSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  trip_id: { type: Schema.Types.ObjectId, ref: "Trip" },
});

const User = model("User", userSchema);
const Trip = model("Trip", tripSchema);
const UserTrip = model("UserTrip", userTripSchema);

// ==== Routes ====

// POST /user - Create user
app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /user - Get all users
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST /trip - Create trip
app.post("/trip", async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /trip - Get all trips
app.get("/trip", async (req, res) => {
  try {
    const trips = await Trip.find().populate("admin_id", "name email");
    res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST /user-trip - Link user to trip
app.post("/user-trip", async (req, res) => {
  try {
    const userTrip = await UserTrip.create(req.body);
    res.status(201).json(userTrip);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /user-trip - List user-trip relations
app.get("/user-trip", async (req, res) => {
  try {
    const result = await UserTrip.find()
      .populate("user_id", "name email")
      .populate("trip_id", "name description");
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ==== Start Server ====
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

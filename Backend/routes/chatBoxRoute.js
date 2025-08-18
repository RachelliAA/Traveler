const express = require("express");
const Together = require("together-ai");

const router = express.Router();

const client = new Together({
  apiKey: process.env.TOGETHER_API_KEY
});

// Mock trips DB (replace later with real DB)
const mockTrips = [
  {
    id: 1,
    userId: "user123",
    destination: "New York",
    date: "2025-08-30",
    activities: ["Statue of Liberty", "Central Park", "Broadway Show"],
    tips: ["Book Broadway tickets early", "Get a MetroCard for subway"]
  },
  {
    id: 2,
    userId: "user123",
    destination: "Tokyo",
    date: "2025-11-02",
    activities: ["Shibuya Crossing", "Tsukiji Market", "Mount Fuji day trip"],
    tips: ["Buy a Suica card", "Learn basic Japanese greetings"]
  }
];

// POST /chat
router.post("/", async (req, res) => {
  const { userId, message } = req.body;

  const trips = mockTrips.filter((t) => t.userId === userId);
  const context = trips.length ? JSON.stringify(trips) : "No trips found.";

  try {
    const response = await client.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [
        {
          role: "system",
          content: `You are a travel assistant. Here are the user's trips: ${context}`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("ChatBoxRoute error:", err);
    res.status(500).json({ reply: "Error calling AI service." });
  }
});

module.exports = router;

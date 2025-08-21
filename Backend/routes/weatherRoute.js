const express = require("express");
const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.OPEN_WEATHER_KEY}&q=${encodeURIComponent(
      city
    )}&days=7&aqi=no&alerts=no`;

    console.log("🔹 Requesting:", url);

    const response = await fetch(url);

    const text = await response.text();
    console.log("🔹 WeatherAPI Raw Response:", text);

    if (!response.ok) {
      return res.status(response.status).json({ error: text });
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (err) {
    console.error("Weather API error:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router; // ✅ Correct export

import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const WeeklyWeather = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "YOUR_API_KEY"; // ← Paste your WeatherAPI key here
  const CITY = "Jerusalem";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7&aqi=no&alerts=no`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await res.json();
        setForecast(data.forecast.forecastday);
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", mt: 3, p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        7-Day Weather Forecast for Jerusalem
      </Typography>

      <Grid container spacing={2}>
        {forecast.map((day, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {new Date(day.date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  })}
                </Typography>

                <Box
                  component="img"
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  sx={{ width: 80, height: 80, my: 1 }}
                />

                <Typography variant="h5">
                  {Math.round(day.day.avgtemp_c)}°C
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  {day.day.condition.text}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  🌡 Min: {Math.round(day.day.mintemp_c)}° | Max:{" "}
                  {Math.round(day.day.maxtemp_c)}°
                </Typography>
                <Typography variant="body2">
                  💧 {day.day.daily_chance_of_rain}% chance of rain
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeeklyWeather;

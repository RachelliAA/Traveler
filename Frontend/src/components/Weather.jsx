import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { fetchWeatherForCity } from "../api/weatherApi";
const WeeklyWeather = () => {
  const [forecasts, setForecasts] = useState({});
  const [loading, setLoading] = useState(true);

  const API_KEY = "7e044f66120149f6ade224715252008"; // <-- Put your WeatherAPI key here
  const CITIES = ["Jerusalem", "Haifa", "Be'er Sheva"];

  useEffect(() => {
    async function  setWeather() {
      try {
        const results = {};
        for (const city of CITIES) {
          results[city] = await fetchWeatherForCity(city);
        }
        setForecasts(results);
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoading(false);
      }
    }
    setWeather();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1400px", margin: "auto", mt: 3, p: 2 }}>
      {CITIES.map((city) => (
        <Box key={city} sx={{ mb: 5 }}>
          <Typography variant="h4" align="center" gutterBottom>
            7-Day Weather Forecast for {city}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            {forecasts[city]?.map((day, index) => (
              <Card
                key={index}
                sx={{
                  flex: "1 1 0", // Grow/shrink equally
                  maxWidth: "calc(100% / 7)", // 7 cards per row
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                  p: 1.5,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {new Date(day.date).toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </Typography>

                  <Box
                    component="img"
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    sx={{ width: 60, height: 60, my: 1 }}
                  />

                  <Typography variant="h6">
                    {Math.round(day.day.avgtemp_c)}°C
                  </Typography>

                  <Typography variant="body2" color="text.secondary" noWrap>
                    {day.day.condition.text}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    🌡 Min: {Math.round(day.day.mintemp_c)}° | Max:{" "}
                    {Math.round(day.day.maxtemp_c)}°
                  </Typography>
                  <Typography variant="body2">
                    💧 {day.day.daily_chance_of_rain}% rain
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WeeklyWeather;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";

export default function RootPage() {
  const navigate = useNavigate();

  // Images for the background slideshow
  const images = ["hike1.jpeg", "hike2.jpeg", "hike1.jpeg"];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          color: "white",
          zIndex: 1,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Traveler Co.
        </Typography>

        <Stack spacing={2} direction="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/login?role=traveler")}
            sx={{ minWidth: 200, borderRadius: 2 }}
          >
            Login as Traveler
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => navigate("/login?role=admin")}
            sx={{ minWidth: 200, borderRadius: 2, color: "white", borderColor: "white" }}
          >
            Login as Admin
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

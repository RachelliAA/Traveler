import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";

export default function RootPage() {
  const navigate = useNavigate();

  // Images for the background slideshow
  const image1="https://media.gettyimages.com/id/1013777774/photo/red-canyon-eilat-israel.jpg?s=612x612&w=0&k=20&c=7y_4bIl1jLu5XNMzaNEOM_bRibVMNXm_CdLqPLc-kZM="
  const image2="https://media.gettyimages.com/id/1739372937/photo/view-of-jerusalem-old-city.jpg?s=612x612&w=0&k=20&c=VIkvqYLjDjQ2u94Xvui60VJP8Y1mjVqYz2TK84NgGjA="
  const image3="https://media.gettyimages.com/id/148706733/photo/sea-of-galilee-from-the-mount-of-beatitudes.jpg?s=612x612&w=0&k=20&c=O9TLi_A3L92swAN02tvHP6Q26DbDSlouuefwDaD9xEo="
  const images = [image1, image2, image3];

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
          The Traveler
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

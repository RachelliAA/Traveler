// components/Footer.jsx
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { GitHub, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} the Traveler. All rights reserved.
        </Typography>

        <Box>
          <IconButton
            component={Link}
            href="https://twitter.com/"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <Twitter />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener"
            color="inherit"
            >
            <Instagram />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Tooltip } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ProfileDialog from "../components/Profile";  // ✅ Import profile

export default function Navbar({ user }) {
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("trips");
    window.location.href = "/"; // safer than navigate("/") from deep inside
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          {/* Back button */}
          <IconButton edge="start" color="inherit" onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>

          {/* <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Welcome{user?.name ? `, ${user.name}` : ""}
          </Typography> */}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Welcome{user?.name ? `, ${user.name}` : ""}{user?.is_admin ? " (admin)" : ""}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Profile Button */}
          <Tooltip title="Profile">
            <IconButton
              size="large"
              edge="end"
              sx={{ mr: 1, color: "inherit" }}
              aria-label="profile"
              onClick={() => setProfileOpen(true)}  // ✅ open dialog
            >
              <AccountCircleRoundedIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Profile Dialog is controlled here */}
      <ProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
      />
    </>
  );
}

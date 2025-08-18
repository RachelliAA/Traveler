import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function Navbar({ onProfileClick, user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1); // goes back one page in history
  };

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Back button on the left */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Welcome{user?.name ? `, ${user.name}` : ""}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Profile">
          <IconButton
            size="large"
            edge="end"
            onClick={onProfileClick}
            sx={{ mr: 1, color: "inherit" }}
            aria-label="profile"
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
  );
}

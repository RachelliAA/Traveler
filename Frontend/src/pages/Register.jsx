
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addUser } from "../api/usersApi";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  Paper
} from "@mui/material";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Set role from query string
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const role = searchParams.get("role") || "traveler";
    setIsAdmin(role === "admin");
  }, [location.search]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const newUser = {
        name,
        email,
        password,
        phone_number: phoneNumber,
        address,
        is_admin: isAdmin
      };

      await addUser(newUser);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate(`/login?role=${isAdmin ? "admin" : "traveler"}`), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isAdmin ? "Admin Registration" : "Traveler Registration"}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.2 }}
          >
            Register
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Button
              variant="text"
              onClick={() => navigate(`/login?role=${isAdmin ? "admin" : "traveler"}`)}
            >
              Login here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;

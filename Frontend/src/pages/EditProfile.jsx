import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addUser, fetchUserById } from "../api/usersApi";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  Paper,
} from "@mui/material";
import { updateUser } from "../api/usersApi";

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { id } = location.state || {};
  const id = JSON.parse(localStorage.getItem("loggedInUser"))._id;

  const [person, setPerson] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    async function loadUser() {
      console.log("Loading user details for ID:", id);
      setPerson(await fetchUserById(id));
    }

    loadUser();
  }, []);
  const handleFieldChange = (field, value) => {
    setPerson((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await updateUser(person._id, person);
      const { password, ...personWithoutPassword } = person;
      localStorage.setItem("loggedInUser", JSON.stringify(personWithoutPassword));


      setSuccess("Edit successful! Redirecting to Homepage...");
      setTimeout(() => navigate(`/user-trips`), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {"Edit Profile"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Full Name"
            value={person.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={person.email || ""}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            value={person.password || ""}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={person.phone_number || ""}
            onChange={(e) => handleFieldChange("phone_number", e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            value={person.address || ""}
            onChange={(e) => handleFieldChange("address", e.target.value)}
            margin="normal"
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              sx={{ flex: 1, py: 1.2 }}
            >
              Save Changes
            </Button>

            <Button
              onClick={() => navigate(`/user-trips`)}
              variant="contained"
              sx={{ flex: 1, py: 1.2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditProfile;

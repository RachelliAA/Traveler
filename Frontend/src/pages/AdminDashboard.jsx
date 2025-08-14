import { useState, useEffect } from "react";
import { Container, Typography, Button, Box, CircularProgress, Alert } from "@mui/material";
import TripList from "../components/TripList";
import TripDetails from "../components/TripDetails";
import TripForm from "../components/TripForm";
import { fetchTrips, addTrip, updateTrip } from "../api/tripsApi";
import { deleteTrip } from "../api/tripsApi"; // make sure you have this in your API

export default function AdminDashboard({ user }) {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [mode, setMode] = useState("list"); // "list" | "details" | "add" | "edit"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTrips();
  }, []);

  async function loadTrips() {
    try {
      setLoading(true);
      const data = await fetchTrips();
      setTrips(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  

  async function handleDeleteTrip(tripId) {
    await deleteTrip(tripId);
    setTrips((prev) => prev.filter((t) => t._id !== tripId));
    setMode("list");
  }

  async function handleAddTrip(tripData) {
    const newTrip = await addTrip({ ...tripData, admin_id: user._id });
    setTrips((prev) => [...prev, newTrip]);
    setMode("list");
  }

  async function handleUpdateTrip(tripData) {
    const updated = await updateTrip(selectedTrip._id, tripData);
    setTrips((prev) =>
      prev.map((t) => (t._id === selectedTrip._id ? updated : t))
    );
    setSelectedTrip(updated);
    setMode("details");
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name} (Admin)
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />}

      {!loading && mode === "list" && (
        <>
          <Box textAlign="right" mb={2}>
            <Button variant="contained" onClick={() => setMode("add")}>
              Add New Trip
            </Button>
          </Box>
          <TripList trips={trips} onSelectTrip={(trip) => {
            setSelectedTrip(trip);
            setMode("details");
          }} />
        </>
      )}

      {mode === "details" && selectedTrip && (
        <TripDetails
          trip={selectedTrip}
          onEditTrip={() => setMode("edit")}
          onBack={() => setMode("list")}
          onDeleteTrip={handleDeleteTrip}
        />

      )}

      {mode === "add" && (
        <TripForm
          onSubmit={handleAddTrip}
          onCancel={() => setMode("list")}
        />
      )}

      {mode === "edit" && selectedTrip && (
        <TripForm
          initialData={selectedTrip}
          onSubmit={handleUpdateTrip}
          onCancel={() => setMode("details")}
        />
      )}
    </Container>
  );
}

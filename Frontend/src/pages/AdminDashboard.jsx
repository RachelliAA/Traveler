import { useState, useEffect } from "react";
import { Container, Typography, Button, Box, CircularProgress, Alert } from "@mui/material";
import TripList from "../components/TripList";
import TripDetails from "../components/TripDetails";
import TripForm from "../components/TripForm";
import TripFilters from "../components/TripFilters";
import { fetchTrips, addTrip, updateTrip, deleteTrip } from "../api/tripsApi";

export default function AdminDashboard({ user }) {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [mode, setMode] = useState("list"); // "list" | "details" | "add" | "edit"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [filterText, setFilterText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [availableTickets, setAvailableTickets] = useState(0);

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

  // Apply filters
  const filteredTrips = trips
    .filter((trip) => {
      const matchesText =
        trip.name.toLowerCase().includes(filterText.toLowerCase()) ||
        (trip.description?.toLowerCase().includes(filterText.toLowerCase()) ?? false);

      const matchesDate = startDate
        ? new Date(trip.start_date) >= new Date(startDate)
        : true;

      const matchesTickets = trip.available_tickets >= availableTickets;

      return matchesText && matchesDate && matchesTickets;
    })
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date)); // default sort by start date

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name} (Admin)
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />}

      {!loading && mode === "list" && (
        <>
          <TripFilters
            filterText={filterText}
            setFilterText={setFilterText}
            startDate={startDate}
            setStartDate={setStartDate}
            availableTickets={availableTickets}
            setAvailableTickets={setAvailableTickets}
          />

          <Box textAlign="right" mb={2}>
            <Button variant="contained" onClick={() => setMode("add")}>
              Add New Trip
            </Button>
          </Box>

          <TripList
            trips={filteredTrips}
            onSelectTrip={(trip) => {
              setSelectedTrip(trip);
              setMode("details");
            }}
          />
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

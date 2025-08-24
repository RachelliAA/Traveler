import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card, CardContent, Typography,
  Button, Box, Divider
} from "@mui/material";
import TravelersList from "../components/TravelersList";
import { fetchTripById, deleteTrip, updateTrip } from "../api/tripsApi";
import Navbar from "../components/Navbar";
import TripForm from "../components/TripForm";

export default function AdminTripDetails() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    async function fetchTrip() {
      try {
        const data = await fetchTripById(tripId);

        // Check if logged-in user is the trip owner
        if (!user || data.admin_id !== user._id) {
          alert("You do not have access to this trip");
          navigate("/", { replace: true });
          return;
        }
        
        setTrip(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrip();
  }, [tripId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!trip) return <Typography>Trip not found</Typography>;

  async function handleDeleteTrip() {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      await deleteTrip(trip._id);
      navigate("/admin");
    }
  }

  async function handleUpdate(updatedTrip) {
    try {
      const savedTrip = await updateTrip(trip._id, updatedTrip);
      setTrip(savedTrip);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update trip", err);
    }
  }

  return (
    <Card>
      <Navbar user={user} />
      <CardContent>
        {editing ? (
          <TripForm
            initialData={trip}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <>
            <Typography variant="h5">{trip.name}</Typography>
            <Typography variant="subtitle1">{trip.location}</Typography>
            <Typography>{trip.description}</Typography>
            <Typography>Price: ${trip.price}</Typography>
            <Typography>Available tickets: {trip.available_tickets}</Typography>
            <Typography>
              Start: {new Date(trip.start_date).toLocaleDateString()}
            </Typography>
            <Typography>
              End: {new Date(trip.end_date).toLocaleDateString()}
            </Typography>

            <Box mt={2}>
              <Button variant="contained" onClick={() => setEditing(true)} sx={{ mr: 1 }}>
                Update Trip Details
              </Button>
              <Button variant="outlined" color="error" onClick={handleDeleteTrip}>
                Cancel Trip
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Images</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
              {trip.images?.length ? (
                trip.images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Trip image ${index + 1}`}
                    style={{ width: 150, height: 100, objectFit: "cover", borderRadius: 4 }}
                  />
                ))
              ) : (
                <Typography variant="body2">No images available</Typography>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Travelers</Typography>
            <TravelersList tripId={trip._id} tripName={trip.name} />
          </>
        )}
      </CardContent>
    </Card>
  );
}

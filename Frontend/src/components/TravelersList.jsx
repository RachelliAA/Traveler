import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { fetchTravelersOfTrip } from "../api/userTripApi";
//Frontend\src\api\UserTripApi.js

export default function TravelersList({ tripId }) {
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tripId) return;
    async function loadTravelers() {
      try {
        setLoading(true);
        const data = await fetchTravelersOfTrip(tripId);
        setTravelers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTravelers();
  }, [tripId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  if (!travelers || travelers.length === 0) {
    return <Typography variant="body2">No travelers have signed up yet.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Traveler ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tickets</TableCell>
            <TableCell>Purchase Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {travelers.map((t) => (
            <TableRow key={t._id}>
              <TableCell>{t.user_id?._id}</TableCell>
              <TableCell>{t.user_id?.name || "Unnamed User"}</TableCell>
              <TableCell>{t.user_id?.email}</TableCell>
              <TableCell>{t.number_of_tickets}</TableCell>
              <TableCell>{new Date(t.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

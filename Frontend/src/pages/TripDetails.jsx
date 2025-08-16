import {
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addUserToTrip } from "../api/UserTripApi";

export default function TripDetails({ onProfileClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { trip, user } = location.state || {};
  
  const [tickets, setTickets] = useState(1);

  const onRegister = async () => {
    const userTrip = {
      trip_id: trip._id,
      user_id: user._id,
      number_of_tickets: tickets,
    };
    await addUserToTrip(userTrip, trip);
    navigate("/user-trips");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <Navbar onProfileClick={onProfileClick} user={user} />

      {/* Trip Info */}
      <Container
        disableGutters
        maxWidth="md"
        sx={{ py: 3, px: { xs: 2, sm: 3 } }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          {trip.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          Location: {trip.location}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          Dates: {new Date(trip.start_date).toLocaleDateString()} -{" "}
          {new Date(trip.end_date).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          Price: ${trip.price}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Available Tickets: {trip.available_tickets} / {trip.max_tickets}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {trip.description}
        </Typography>

        {/* Images */}
        {trip.images && trip.images.length > 0 && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {trip.images.map((img, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <Card>
                  <CardMedia
                    component="img"
                    image={img}
                    alt={`Trip image ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Tickets Selection + Register Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <TextField
            label="Tickets"
            type="number"
            value={tickets}
            onChange={(e) => {
              let val = Math.max(1, Math.min(trip.available_tickets, Number(e.target.value)));
              setTickets(val);
            }}
            inputProps={{
              min: 1,
              max: trip.available_tickets,
            }}
            sx={{ width: "120px" }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onRegister}
          >
            Sign up
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

//todo
/***
 * make trip details nice
 * figure out the images
 * my trips all trips
 * allow changing trip order
 */
//questions
/**
 * when loading trips do you load them with all their info?
 * 
 */
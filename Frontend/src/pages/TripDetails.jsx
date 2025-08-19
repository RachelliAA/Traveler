import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Divider,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { addUserToTrip } from "../api/UserTripApi";

export default function TripDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { trip, user, myTrip } = location.state || {};

  const [tickets, setTickets] = useState(1);

  const handleSignUp = async () => {
    const userTrip = {
      trip_id: trip._id,
      user_id: user._id,
      number_of_tickets: tickets,
    };
    await addUserToTrip(userTrip, trip);
    navigate("/user-trips");
  };
  const handleDelete=async()=>{

  }
  const handleEdit=async()=>{
    
  }
  return (
    <>
      {/* Navbar */}
      <Navbar onProfileClick={onProfileClick} user={user} />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={8}>
          {/* Left Column: Trip Info */}
          <Grid item xs={12} md={5}>
            <Typography variant="h4" gutterBottom>
              {trip.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {trip.location}
            </Typography>

            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography variant="body1">
                <strong>Start Date:</strong>{" "}
                {new Date(trip.start_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>End Date:</strong>{" "}
                {new Date(trip.end_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Price:</strong> ${trip.price}
              </Typography>
              <Typography variant="body1">
                <strong>Available Tickets:</strong> {trip.available_tickets} /{" "}
                {trip.max_tickets}
              </Typography>
            </Box>

            <Divider />

            {/* Description */}
            <Box sx={{ my: 3 }}>
              <Typography variant="h6">About this trip</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {trip.description}
              </Typography>
            </Box>

            <Divider />

            {/* Sign up section */}
            
             
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", mt: 3 }}
              >
                {myTrip? <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                </>:<><TextField
                  select
                  label="Tickets"
                  value={tickets}
                  onChange={(e) => setTickets(Number(e.target.value))}
                  size="small"
                  sx={{ width: 120 }}
                >
                  {Array.from(
                    { length: trip.available_tickets },
                    (_, i) => i + 1
                  ).map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignUp}
                  disabled={trip.available_tickets === 0}
                >
                  Sign Up
                </Button></>}
                
              </Box>
            
          </Grid>

          {/* Right Column: Pictures */}
          <Grid item xs={12} md={7}>
            <Typography variant="h6" gutterBottom>
              Pictures
            </Typography>
            {trip.images && trip.images.length > 0 ? (
              <Grid container spacing={2}>
                {trip.images.map((img, idx) => (
                  <Grid item xs={6} sm={4} key={idx}>
                    <Card sx={{ borderRadius: 2 }}>
                      <CardMedia
                        component="img"
                        image={img}
                        alt={`Trip image ${idx + 1}`}
                        sx={{ height: 200, objectFit: "cover" }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : trip.image_base64 ? (
              <Card>
                <CardMedia
                  component="img"
                  image={`data:image/jpeg;base64,${trip.image_base64}`}
                  alt={trip.name}
                  sx={{ height: 300, objectFit: "cover" }}
                />
              </Card>
            ) : (
              <Typography>No images available.</Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
//todo
/***
 * allow changing trip order
 * allow deleting trip order
 * disabling if available tickets are 0
 * load at scroll....
 * edit profile
 * V change log in to mui
 * V logout
 * V remove double header
 * V my trips layout
 * 
 *
 */
//questions
/**
 * when loading trips do you load them with all their info?
 *
 */

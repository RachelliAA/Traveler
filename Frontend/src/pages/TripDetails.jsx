import {

  Typography,
  Button,
  Container,
  Box,
  Card,
  CardMedia,
  Grid,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { addUserToTrip } from "../api/UserTripApi";
import { useNavigate } from "react-router-dom";
export default function TripDetails({ onProfileClick }) {
    const navigate = useNavigate();

const location = useLocation();
  const { trip, user } = location.state || {}; // <-- access inside `state`
const onRegister=async ()=>{
  const userTrip={
    trip_is: trip._id,
    user_id: user._id
  }
  await addUserToTrip(userTrip);
  navigate("/user-trips")
}


  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", width: "100%", overflowX: "hidden" }}>
      {/* Header */}
        <Navbar onProfileClick={onProfileClick} user={user}></Navbar>
   

      {/* Trip Info */}
      <Container disableGutters maxWidth="md" sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
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
                  <CardMedia component="img" image={img} alt={`Trip image ${index + 1}`} />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Register Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => onRegister()}
        >
          Sign up
        </Button>
      </Container>
    </Box>
  );
}

//todo
/***
 * sign up to trip fix!!!!!!!!!!!1
 * make trip details nice
 * figure out the images
 * 
 */
//questions
/**
 * when loading trips do you load them with all their info?
 */
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
import ProfileDialog from "../components/Profile";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { addUserToTrip, cancelTripOrder, changeTripOrder } from "../api/UserTripApi";
import { useEffect } from "react";
import { fetchUserTrip } from "../api/UserTripApi";
import TicketOrderDialog from "../components/AddTickets";
export default function TripDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { trip, user, myTrip } = location.state || {};

  const [tickets, setTickets] = useState(1);
  const [profileOpen, setProfileOpen] = useState(false);
  const [usertrip, setUsertrip]=useState({})
  const [openAddTickets, setOpenAddTickets] = useState(false);

   useEffect(() => {
    async function getNumberOfTickets() {
      setUsertrip(await fetchUserTrip(user._id, trip._id))  
    }
    if(myTrip){
      getNumberOfTickets()
    }
  }, [openAddTickets]);
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
    await cancelTripOrder(usertrip, trip)
    navigate("/user-trips");
  }
  
const handleOrderTickets = async(tickets_num) => {
   await changeTripOrder(usertrip, trip,  tickets_num)
  };

  return (
    <>
      {/* Navbar */}
      <Navbar onProfileClick={()=>setProfileOpen(true)} user={user} />
  <ProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
      />
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
                  <Typography variant="body1">
                <strong>{`You ordered ${usertrip.number_of_tickets} ${usertrip.number_of_tickets>1? "tickets":"ticket"}`}</strong> 
               
              </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>setOpenAddTickets(true)}
                >
                  Order more tickets
                </Button>
                   <TicketOrderDialog
        open={openAddTickets}
        onClose={() => setOpenAddTickets(false)}
        onOrder={handleOrderTickets}
      />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDelete}
                >
                  Cancel order
                </Button>
                </>:<>
                
                <TextField
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
 * load at scroll
 * fix positions in details
 * add price to filters
 * 
 */
//questions
/**
 * when loading trips do you load them with all their info?
 *
 */

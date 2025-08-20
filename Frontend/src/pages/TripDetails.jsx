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
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ProfileDialog from "../components/Profile";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  addUserToTrip,
  cancelTripOrder,
  changeTripOrder,
  fetchUserTrip,
} from "../api/UserTripApi";
import TicketOrderDialog from "../components/AddTickets";

export default function TripDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { trip, user, myTrip } = location.state || {};
  const [thisTrip, setThisTrip]=useState(trip)
  const [tickets, setTickets] = useState(1);
  const [profileOpen, setProfileOpen] = useState(false);
  const [usertrip, setUsertrip] = useState({});
  const [openAddTickets, setOpenAddTickets] = useState(false);

  // For images pagination
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 4;
  const totalPages = Math.ceil((trip.images?.length || 0) / imagesPerPage);
 async function getNumberOfTickets() {
      setUsertrip(await fetchUserTrip(user._id, trip._id));
    }
  useEffect(() => {
   
    if (myTrip) {
      getNumberOfTickets();
    }
  }, [openAddTickets]);

  // const handleSignUp = async () => {
  //   const userTrip = {
  //     trip_id: trip._id,
  //     user_id: user._id,
  //     number_of_tickets: tickets,
  //   };
  //   await addUserToTrip(userTrip, trip);
  //   navigate("/user-trips");
  // };
  const handleSignUp = () => {
    navigate("/payment", { state: { trip, tickets, user } });
  };


  const handleDelete = async () => {
    await cancelTripOrder(usertrip, trip);
    navigate("/user-trips");
  };

  const handleOrderTickets = async (tickets_num) => {
  const newTrip={...trip, available_tickets: trip.available_tickets-tickets_num}
    await changeTripOrder(usertrip, newTrip, tickets_num);
    setThisTrip(newTrip)
    getNumberOfTickets()
  };

  // Navigate images
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setCurrentPage((prev) =>
      prev < totalPages - 1 ? prev + 1 : prev
    );
  };

  const currentImages =
    thisTrip.images?.slice(
      currentPage * imagesPerPage,
      currentPage * imagesPerPage + imagesPerPage
    ) || [];

  return (
    <>
      {/* Navbar */}
      <Navbar onProfileClick={() => setProfileOpen(true)} user={user} />
      <ProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
      />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Trip Info + Sign Up Side by Side */}
        <Grid
          container
          spacing={12}
          sx={{
            alignItems: "flex-start", // align top edges
          }}
        >
          {/* Left Side: Trip Info */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              {thisTrip.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {thisTrip.location}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Start Date:</strong>{" "}
                {new Date(thisTrip.start_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>End Date:</strong>{" "}
                {new Date(thisTrip.end_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Price:</strong> ${thisTrip.price}
              </Typography>
              <Typography variant="body1">
                <strong>Available Tickets:</strong> {thisTrip.available_tickets} /{" "}
                {thisTrip.max_tickets}
              </Typography>
            </Box>
          </Grid>

          {/* Right Side: Sign-Up / Ticket Ordering */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "flex-start",
                mt: 1,
              }}
            >
              {myTrip ? (
                <>
                  <Typography
  variant="h6" // Bigger text size
  align="center" // Centers the text horizontally
  sx={{ fontWeight: "bold", mt: 2 }}
>
  You ordered {usertrip.number_of_tickets}{" "}
  {usertrip.number_of_tickets > 1 ? "tickets" : "ticket"}
</Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenAddTickets(true)}
                    sx={{width: "210px"}}
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
                    sx={{width: "210px"}}
                  >
                    Cancel order
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    select
                    label="Tickets"
                    value={tickets}
                    onChange={(e) => setTickets(Number(e.target.value))}
                    size="small"
                    sx={{ width: 200 }}
                  >
                    {Array.from(
                      { length: thisTrip.available_tickets },
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
                    disabled={thisTrip.available_tickets === 0}
                     sx={{ width: 200 }}
                  >
                    Order TIckets
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Pictures Section with arrows */}
              {/* Pictures Section with horizontal scrolling */}
        <Box sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h6" gutterBottom>
            Pictures
          </Typography>

          {trip.images && trip.images.length > 0 ? (
            <Box sx={{ position: "relative" }}>
              {/* Left Arrow */}
              <IconButton
                onClick={() => {
                  const container = document.getElementById("pictures-scroll");
                  container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
                }}
                sx={{
                  position: "absolute",
                  left: -30,
                  top: "40%",
                  zIndex: 2,
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ArrowBackIos />
              </IconButton>

              {/* Scrollable Pictures */}
              <Box
                id="pictures-scroll"
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
                }}
              >
                {trip.images.map((img, idx) => (
                  <Card
                    key={idx}
                    sx={{
                      minWidth: 220,
                      height: 200,
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={img}
                      alt={`Trip image ${idx + 1}`}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Card>
                ))}
              </Box>

              {/* Right Arrow */}
              <IconButton
                onClick={() => {
                  const container = document.getElementById("pictures-scroll");
                  container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
                }}
                sx={{
                  position: "absolute",
                  right: -30,
                  top: "40%",
                  zIndex: 2,
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>
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
        </Box>


        <Divider sx={{ mb: 4 }} />

        {/* About Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" gutterBottom>
            About this trip
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {trip.description}
          </Typography>
        </Box>
      </Container>
    </>
  );
}


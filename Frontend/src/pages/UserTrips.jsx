import {
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchTrips } from "../api/tripsApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function MUITripsPage({
  onTripClick,
  onLogout = () => console.log("Logout clicked"),
  onProfileClick = () => console.log("Profile clicked"),
}) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const [tab, setTab] = useState(0); // 0 = Trips, 1 = My Trips
  const [trips, setTrips] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
  onTripClick = (trip) => {
    navigate(`/trip/${trip._id}`, {
      state: { trip: trip, user: user },
    });
  };
  useEffect(() => {
    async function loadTrips() {
      const fetchedTrips = await fetchTrips();
      setTrips(fetchedTrips);
      console.log(fetchedTrips);
      const fetchedMyTrips = await fetchTrips(); // if you have this too
      setMyTrips(fetchedMyTrips);
    }
    loadTrips();
  }, []);
  const displayedTrips = tab == 0 ? trips : myTrips;

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
     <Navbar onProfileClick={onProfileClick} user={user}></Navbar>
      {/* Tabs */}
      <Container
        disableGutters
        maxWidth={false}
        sx={{ bgcolor: "background.paper", px: { xs: 2, sm: 3 }, pt: 1 }}
      >
        <Tabs
          value={tab}
          onChange={(e, newVal) => setTab(newVal)}
          indicatorColor="primary"
          textColor="primary"
          variant="standard" // default, doesn't stretch
          sx={{
            minHeight: 48,
          }}
        >
          <Tab label="Trips" sx={{ minHeight: 48 }} />
          <Tab label="My Trips" sx={{ minHeight: 48 }} />
        </Tabs>
      </Container>

      {/* Trip Grid */}
      <Container
        disableGutters
        maxWidth={false}
        sx={{ py: 3, px: { xs: 2, sm: 3 } }}
      >
        <Grid container spacing={2}>
          {displayedTrips.map((trip) => (
            <Grid key={trip.id} item xs={12} sm={6} md={4} lg={3}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                }}
              >
                <CardActionArea
                  onClick={() => onTripClick(trip)}
                  sx={{ height: "100%", alignItems: "stretch" }}
                >
                  {trip.image ? (
                    <CardMedia
                      component="img"
                      height="160"
                      image={trip.image}
                      alt={trip.title}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 160,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "grey.200",
                      }}
                    >
                      <Typography variant="subtitle1">No image</Typography>
                    </Box>
                  )}
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          gutterBottom
                          variant="h6"
                          sx={{ lineHeight: 1.2 }}
                        >
                          {trip.title}
                        </Typography>
                        {trip.location && (
                          <Typography variant="body2" color="text.secondary">
                            {trip.location}
                          </Typography>
                        )}
                        {trip.dates && (
                          <Typography variant="body2" color="text.secondary">
                            {trip.dates}
                          </Typography>
                        )}
                      </Box>
                      {trip.tag && <Chip label={trip.tag} size="small" />}
                    </Box>
                    {trip.price !== undefined && (
                      <Typography
                        variant="subtitle2"
                        sx={{ mt: 1, fontWeight: 600 }}
                      >
                        {typeof trip.price === "number"
                          ? `$${trip.price.toString()}`
                          : trip.price}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/* Sample Data */
const sampleTrips = [
  {
    id: 1,
    title: "Desert Sunrise Tour",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    location: "Negev Desert",
    dates: "Sep 2–4, 2025",
    price: 299,
    tag: "Popular",
  },
  {
    id: 2,
    title: "Jerusalem Old City Walk",
    image:
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1600&auto=format&fit=crop",
    location: "Jerusalem, Israel",
    dates: "Aug 22, 2025",
    price: 59,
  },
];

const sampleMyTrips = [
  {
    id: 101,
    title: "Eilat Beach Vacation",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1600&auto=format&fit=crop",
    location: "Eilat",
    dates: "Nov 5–8, 2025",
    price: 399,
    tag: "Booked",
  },
];

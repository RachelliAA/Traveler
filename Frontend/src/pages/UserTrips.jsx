import { Container, Box, Tabs, Tab, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchTrips } from "../api/tripsApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchTripsofUser } from "../api/UserTripApi";
import TripCard from "../components/TripCard";
import ProfileDialog from "../components/Profile";

export default function TripsPage({onLogout = () => console.log("Logout clicked"),
   onProfileClick = () => console.log("Profile clicked"),}) {
  const [tab, setTab] = useState(0);
 const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const [trips, setTrips] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
  const onTripClick = (trip) => {
    navigate(`/trip/${trip._id}`, {
      state: { trip: trip, user: user, myTrip: tab==0? false:true },
    });
  };
  useEffect(() => {
    async function loadTrips() {
      const fetchedTrips = await fetchTrips();
      setTrips(fetchedTrips);
      const fetchedMyTrips = await fetchTripsofUser(user._id);
      setMyTrips(fetchedMyTrips);
    }
    loadTrips();
  }, []);
  const displayedTrips = tab == 0 ? trips : myTrips;

  return (
    <> <Navbar onProfileClick={()=>setProfileOpen(true)} user={user}></Navbar>
     <ProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
      />
    <Container maxWidth="lg" sx={{ mt: 4 }}>
           

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab label="Trips" />
          <Tab label="My Trips" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)", // exactly 5 per row
            gap: 2,
          }}
        >
          {displayedTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onTripClick={()=>onTripClick(trip)}/>
          ))}
          {tab === 1 && myTrips.length === 0 && (
            <Typography>No trips yet.</Typography>
          )}
        </Box>
      </Box>
    </Container></>
  );
}

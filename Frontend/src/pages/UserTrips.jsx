import { Container, Box, Tabs, Tab, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchTrips } from "../api/tripsApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchTripsofUser } from "../api/UserTripApi";
import TripCard from "../components/TripCard";
import ProfileDialog from "../components/Profile";
import TripFilters from "../components/TripFilters";
import ChatButton from "../components/ChatButton";

export default function TripsPage({}) {
  const [tab, setTab] = useState(0);
 const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const [trips, setTrips] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
  //filters:
  const [filterText, setFilterText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [availableTickets, setAvailableTickets] = useState(0);
  const [maxPrice, setPrice] = useState(1000);

  const onTripClick = (trip) => {
    navigate(`/trip/${trip._id}`, {
      state: { trip: trip, user: user, myTrip: tab==0? false:true },
    });
  };
  useEffect(() => {
  async function loadTrips() {
    const fetchedTrips = await fetchTrips();
    const fetchedMyTrips = await fetchTripsofUser(user._id);

    const myTripIds = new Set(fetchedMyTrips.map(trip => trip._id));
    const availableTrips = fetchedTrips.filter(trip => !myTripIds.has(trip._id));

    setTrips(availableTrips);
    setMyTrips(fetchedMyTrips);

  }
  loadTrips();
}, [user._id]);

  const displayedTrips = (tab == 0 ? trips : myTrips)
    .filter((trip) => {
      const matchesText =
        trip.name.toLowerCase().includes(filterText.toLowerCase()) ||
        (trip.description?.toLowerCase().includes(filterText.toLowerCase()) ?? false);

      const matchesDate = startDate
        ? new Date(trip.start_date) >= new Date(startDate)
        : true;

      const matchesTickets = trip.available_tickets >= availableTickets;
      const matchesPrice=trip.price<=maxPrice;
      return matchesText && matchesDate && matchesTickets && matchesPrice;
    })
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date)); // default sort by start date

  return (
    <> 
    <Navbar onProfileClick={()=>setProfileOpen(true)} user={user}></Navbar>
     <ProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
      />
    <Container maxWidth="lg" sx={{ mt: 4 }}>
           

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 4}}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab label="Trips" />
          <Tab label="My Trips" />
        </Tabs>
      </Box>
    <TripFilters
      filterText={filterText}
      setFilterText={setFilterText}
      startDate={startDate}
      setStartDate={setStartDate}
      availableTickets={availableTickets}
      setAvailableTickets={setAvailableTickets}
      maxPrice={maxPrice}
      setPrice={setPrice}
    />
      {/* Content */}
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(216px, 216px))", // each card = max 200px
          gap: 2,
          justifyContent: "start", // align grid items left
        }}
      >
        {displayedTrips.map((trip) => (
          <Box key={trip.id} sx={{ width: 216 }}>
            <TripCard trip={trip} onTripClick={() => onTripClick(trip)} />
          </Box>
        ))}

        {tab === 1 && myTrips.length === 0 && (
          <Typography>No trips yet.</Typography>
        )}
      </Box>
    </Box>


    <ChatButton userId={user._id} />
    </Container></>
  );
}


// /**
//  * Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

//  * here will be home
//       To Do
//       make a profile component with user info
//       at the beginning of page requests user from db or already gets it from login??
//       sqaures with trips 
//       different filters
//       section with my trips
//       notifications
//  */
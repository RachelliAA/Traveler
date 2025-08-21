import { Container, Box, Tabs, Tab, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchTrips } from "../api/tripsApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchTripsofUser } from "../api/userTripApi";
import ProfileDialog from "../components/Profile";
import TripFilters from "../components/TripFilters";
import ChatButton from "../components/ChatButton";
import WeeklyWeather from "../components/WEather";
import UserTrips from "../components/TripCardsGrid";
import { fetchTenTrips } from "../api/tripsApi";

export default function TripsPage({}) {
  const [tab, setTab] = useState(0);
 const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const [myTrips, setMyTrips] = useState([]);
  //filters:
  const [filterText, setFilterText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [availableTickets, setAvailableTickets] = useState(0);
  const [maxPrice, setPrice] = useState(1000);

    const [trips, setTrips] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
  async function loadMyTrips() {
    // Only fetch the trips the user has booked, nothing else
    const fetchedMyTrips = await fetchTripsofUser(user._id);
    setMyTrips(fetchedMyTrips);
  }

  async function loadInitialTrips() {
    const savedTrips = localStorage.getItem("trips");

    if (savedTrips) {
      const { trips: storedTrips, total: storedTotal, page: storedPage } = JSON.parse(savedTrips);
      setTrips(storedTrips);
      setTotal(storedTotal);
      setPage(storedPage);
    } else {
      // If nothing stored, load first 5 trips
      await loadMoreTrips(1);
    }
  }

  loadMyTrips();
  loadInitialTrips();
}, []);

const loadMoreTrips = async (nextPage = page) => {
  if (loading) return;
  setLoading(true);
  try {
    const { trips: newTrips, total: totalTrips } = await fetchTenTrips(nextPage, 5);

    const updatedTrips = nextPage === 1 ? newTrips : [...trips, ...newTrips];
    setTrips(updatedTrips);
    setTotal(totalTrips);
    setPage(nextPage);

    localStorage.setItem(
      "trips",
      JSON.stringify({
        trips: updatedTrips,
        total: totalTrips,
        page: nextPage,
      })
    );
  } catch (err) {
    console.error("Failed to load trips:", err);
  } finally {
    setLoading(false);
  }
};

 const onTripClick = (trip) => {
      navigate(`/trip/${trip._id}`, {
        state: { trip: trip, user: user, myTrip: myTrips.some(mt => mt._id === trip._id)}
      });
    };
  const displayedTrips = (tab==1? myTrips: trips)
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
          <Tab label="Weather Forecast" />
        </Tabs>
      </Box>
      {tab==2? <WeeklyWeather/>:<>
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
<UserTrips displayedTrips={displayedTrips} onTripClick={onTripClick} />

{tab === 0 && trips.length < total && (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
    <Button
      onClick={() => loadMoreTrips(page + 1)}
      disabled={loading}
      variant="contained"
      color="primary"
      sx={{
        px: 4,
        py: 1.5,
        fontSize: "1rem",
        fontWeight: "bold",
        borderRadius: "12px",
        boxShadow: 3,
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      {loading ? "Loading..." : "Load More"}
    </Button>
  </Box>
)}

      </>}
   


    <ChatButton userId={user._id} />
    </Container></>
  );
}

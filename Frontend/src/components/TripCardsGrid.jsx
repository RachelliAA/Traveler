import { Box, } from "@mui/material";
import TripCard from "../components/TripCard";

const UserTrips = ({
    displayedTrips,
    onTripClick
}) => {

  const handleLogout = () => {
    localStorage.removeItem("trips");
    setTrips([]);
    setPage(1);
    setTotal(0);
  };
   

  return (
   
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

       
      </Box>
    </Box>

  );
};

export default UserTrips;


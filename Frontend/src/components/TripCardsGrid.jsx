import { Box } from "@mui/material";
import TripCard from "../components/TripCard";

const UserTrips = ({ displayedTrips, onTripClick }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(216px, 216px))", // fixed card width
          gap: 2,
          justifyContent: "start", // align grid items to the left
        }}
      >
        {displayedTrips.map((trip) => (
          <Box key={trip._id} sx={{ width: 216 }}>
            <TripCard trip={trip} onTripClick={() => onTripClick(trip)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserTrips;

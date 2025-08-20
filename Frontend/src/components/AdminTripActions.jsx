import { Box, Button } from "@mui/material";

export default function AdminTripActions({ trip, onEditTrip, onDeleteTrip }) {
  return (
    <Box mt={2}>
      <Button variant="contained" onClick={onEditTrip} sx={{ mr: 1 }}>
        Update Trip Details
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this trip?")) {
            onDeleteTrip(trip._id);
          }
        }}
      >
        Cancel Trip cccccccccc
      </Button>
    </Box>
  );
}

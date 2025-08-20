import { Typography, Box, Divider } from "@mui/material";

export default function TripInfo({ trip }) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>{trip.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {trip.location}
      </Typography>

      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography><strong>Start Date:</strong> {new Date(trip.start_date).toLocaleDateString()}</Typography>
        <Typography><strong>End Date:</strong> {new Date(trip.end_date).toLocaleDateString()}</Typography>
        <Typography><strong>Price:</strong> ${trip.price}</Typography>
        <Typography><strong>Available Tickets:</strong> {trip.available_tickets} / {trip.max_tickets}</Typography>
      </Box>

      <Divider />

      <Box sx={{ my: 3 }}>
        <Typography variant="h6">About this trip</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {trip.description}
        </Typography>
      </Box>
    </Box>
  );
}

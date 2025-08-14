import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function TripDetails({ trip, onEditTrip, onBack }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{trip.name}</Typography>
        <Typography variant="subtitle1">{trip.location}</Typography>
        <Typography>{trip.description}</Typography>
        <Typography>Price: ${trip.price}</Typography>
        <Typography>Available: {trip.available_tickets}</Typography>
        <Typography>
          Start: {new Date(trip.start_date).toLocaleDateString()}
        </Typography>
        <Typography>
          End: {new Date(trip.end_date).toLocaleDateString()}
        </Typography>

        <Box mt={2}>
          <Button variant="contained" onClick={onEditTrip} sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

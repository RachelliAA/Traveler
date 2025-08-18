import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";

export default function TripCard({ trip, onTripClick }) {
  return (
 <Card
  sx={{
    borderRadius: 2,
    boxShadow: 3,
    display: "flex",
    flexDirection: "column",
    height: 280, // total card height
  }}
  onClick={onTripClick}
>
  {/* Image container: slightly taller */}
<Box
  sx={{
    height: 180,
    width: "100%",
    overflow: "hidden",
    backgroundColor: trip.images?.length ? "transparent" : "#ccc", // fallback color
  }}
>
  {trip.images?.length ? (
    <CardMedia
      component="img"
      image={trip.images[0]}
      alt={trip.name}
      
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  ) : null}
</Box>


  {/* Text content: add top padding to move text slightly lower */}
  <CardContent sx={{ flexGrow: 1, overflow: "hidden", pt: 4 }}>
    <Typography variant="h6" component="div" noWrap>
      {trip.name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Price: ${trip.price}
    </Typography>
  </CardContent>
</Card>



  );
}



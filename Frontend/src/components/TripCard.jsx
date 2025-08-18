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
        height: 280, // fixed card height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        {/* Image */}
        <Box sx={{ height: 140, overflow: "hidden" }}>
          <CardMedia
          onClick={onTripClick}
            component="img"
            image={trip.images[0]}
            alt={trip.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Text */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" noWrap>
            {trip.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${trip.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}



// import { Card, CardContent, Typography, Button, Box } from "@mui/material";

// export default function TripDetails({ trip, onEditTrip, onBack, onDeleteTrip }) {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h5">{trip.name}</Typography>
//         <Typography variant="subtitle1">{trip.location}</Typography>
//         <Typography>{trip.description}</Typography>
//         <Typography>Price: ${trip.price}</Typography>
//         <Typography>Available tickets: {trip.available_tickets}</Typography>
//         <Typography>
//           Start: {new Date(trip.start_date).toLocaleDateString()}
//         </Typography>
//         <Typography>
//           End: {new Date(trip.end_date).toLocaleDateString()}
//         </Typography>

//         <Box mt={2}>
//           <Button variant="contained" onClick={onEditTrip} sx={{ mr: 1 }}>
//             Edit
//           </Button>
//           <Button variant="outlined" onClick={onBack} sx={{ mr: 1 }}>
//             Back
//           </Button>
//           <Button
//             color="error"
//             variant="outlined"
//             onClick={() => {
//               if (window.confirm("Are you sure you want to delete this trip?")) {
//                 onDeleteTrip(trip._id);
//               }
//             }}
//           >
//             Delete
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }


import { Card, CardContent, Typography, Button, Box, Divider } from "@mui/material";
import TravelersList from "./TravelersList";

export default function TripDetails({ trip, onEditTrip, onBack, onDeleteTrip }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{trip.name}</Typography>
        <Typography variant="subtitle1">{trip.location}</Typography>
        <Typography>{trip.description}</Typography>
        <Typography>Price: ${trip.price}</Typography>
        <Typography>Available tickets: {trip.available_tickets}</Typography>
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
          <Button variant="outlined" onClick={onBack} sx={{ mr: 1 }}>
            Back
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
            Delete
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Images</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
          {trip.images && trip.images.length > 0 ? (
            trip.images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Trip image ${index + 1}`}
                style={{
                  width: 150,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 4
                }}
              />
            ))
          ) : (
            <Typography variant="body2">No images available</Typography>
          )}
        </Box>


        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Travelers</Typography>
        <TravelersList travelers={trip.travelers} />
      </CardContent>
    </Card>
  );
}

import { Container, Grid , Typography, Card, CardMedia} from "@mui/material";
import { useLocation } from "react-router-dom";
import TripInfo from "../components/TripInfo";
import UserTripActions from "../components/UserTripActions";
import AdminTripActions from "../components/AdminTripActions";
import TravelersList from "../components/TravelersList";
import { useState } from "react";

export default function TripDetailsPage() {
  const location = useLocation();
  const { trip, user, myTrip } = location.state || {};
  const [tickets, setTickets] = useState(1);

  const isAdmin = user?.role === "admin"; // or however you define roles

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={5}>
          <TripInfo trip={trip} />

          {isAdmin ? (
            <>
              <AdminTripActions
                trip={trip}
                onEditTrip={() => console.log("Edit trip")}
                onDeleteTrip={(id) => console.log("Delete trip", id)}
              />
              <TravelersList tripId={trip._id} />
            </>
          ) : (
            <UserTripActions
              trip={trip}
              tickets={tickets}
              setTickets={setTickets}
              myTrip={myTrip}
              onSignUp={() => console.log("Sign up")}
              onEdit={() => console.log("Edit order")}
              onCancel={() => console.log("Cancel order")}
            />
          )}
        </Grid>

        {/* Right Column: Pictures */}
          <Grid item xs={12} md={7}>
            <Typography variant="h6" gutterBottom>
              Pictures
            </Typography>
            {trip.images && trip.images.length > 0 ? (
              <Grid container spacing={2}>
                {trip.images.map((img, idx) => (
                  <Grid item xs={6} sm={4} key={idx}>
                    <Card sx={{ borderRadius: 2 }}>
                      <CardMedia
                        component="img"
                        image={img}
                        alt={`Trip image ${idx + 1}`}
                        sx={{ height: 200, objectFit: "cover" }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : trip.image_base64 ? (
              <Card>
                <CardMedia
                  component="img"
                  image={`data:image/jpeg;base64,${trip.image_base64}`}
                  alt={trip.name}
                  sx={{ height: 300, objectFit: "cover" }}
                />
              </Card>
            ) : (
              <Typography>No images available.</Typography>
            )}
          </Grid>
        </Grid>
    </Container>
  );
}

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Divider,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  addUserToTrip,
  cancelTripOrder,
  changeTripOrder,
  fetchUserTrip,
} from "../api/userTripApi";
import TicketOrderDialog from "../components/AddTickets";

export default function TripDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Try to get state from navigation
  const { trip, user, myTrip, tickets: initTickets, paymentSuccess } =
    location.state || {};

  useEffect(() => {
    // If there is no user in state or localStorage, redirect to login
    const storedUser = localStorage.getItem("user");
    if (!user && !storedUser) {
      alert("You must be logged in to view trip details.");
      navigate("/login");
    }
  }, [user, navigate]);

  // If we redirected, don't render the page
  if (!user && !localStorage.getItem("user")) {
    return <Typography>Redirecting to login...</Typography>;
  }

  const [tickets, setTickets] = useState(initTickets || 1);
  const [usertrip, setUsertrip] = useState({});
  const [openAddTickets, setOpenAddTickets] = useState(false);
  const [addingMore, setAddingMore]=useState(false)
  // For images pagination
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 4;
  const totalPages = Math.ceil((trip?.images?.length || 0) / imagesPerPage);

  const [thisTrip, setThisTrip] = useState(trip || {});

  async function getNumberOfTickets() {
    if (user && trip) {
      setUsertrip(await fetchUserTrip(user._id, trip._id));
    }
  }

  useEffect(() => {
    if (myTrip) {
      getNumberOfTickets();
    }
  }, [openAddTickets]);

  // 🔥 Payment callback logic stays here (not in PaymentPage)
  useEffect(() => {
    const finalizePayment = async () => {
      if (paymentSuccess && tickets) {
        try {
          const userTrip = {
            trip_id: trip._id,
            user_id: user._id,
            number_of_tickets: tickets,
          };
          await addUserToTrip(userTrip, trip, tickets);

          alert("Payment successful! Redirecting to My Trips...");
          navigate("/user-trips");
        } catch (err) {
          alert("Error finalizing order: " + err.message);
        }
      }
    };
  
      finalizePayment()
    

  }, [paymentSuccess, tickets, trip, user, navigate]);

  const handleSignUp = async () => {
    navigate("/payment", { state: { trip, tickets, user } });
  };

  const handleDelete = async () => {
    await cancelTripOrder(usertrip, trip);
    navigate("/user-trips");
  };

  const handleOrderTickets =  (tickets_num) => {
   setAddingMore(true);
   setTickets(tickets_num)
  };

  // Navigate images
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setCurrentPage((prev) =>
      prev < totalPages - 1 ? prev + 1 : prev
    );
  };

  const currentImages =
    thisTrip.images?.slice(
      currentPage * imagesPerPage,
      currentPage * imagesPerPage + imagesPerPage
    ) || [];

  return (
    <>
      {/* Navbar */}
      <Navbar user={user} />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Trip Info + Sign Up Side by Side */}
        <Grid container spacing={12} sx={{ alignItems: "flex-start" }}>
          {/* Left Side: Trip Info */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              {thisTrip.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {thisTrip.location}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Start Date:</strong>{" "}
                {new Date(thisTrip.start_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>End Date:</strong>{" "}
                {new Date(thisTrip.end_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Price:</strong> ${thisTrip.price}
              </Typography>
              <Typography variant="body1">
                <strong>Available Tickets:</strong> {thisTrip.available_tickets} /{" "}
                {thisTrip.max_tickets}
              </Typography>
            </Box>
          </Grid>

          {/* Right Side: Sign-Up / Ticket Ordering */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "flex-start",
                mt: 1,
              }}
            >
              {myTrip ? (
                <>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: "bold", mt: 2 }}
                  >
                    You ordered {usertrip.number_of_tickets}{" "}
                    {usertrip.number_of_tickets > 1 ? "tickets" : "ticket"}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenAddTickets(true)}
                    sx={{ width: "210px" }}
                    disabled={thisTrip.available_tickets === 0}
                  >
                    Order more tickets
                  </Button>
                  <TicketOrderDialog
                    open={openAddTickets}
                    onClose={() => setOpenAddTickets(false)}
                    onOrder={handleOrderTickets}
                    trip={trip}
                    user={user}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDelete}
                    sx={{ width: "210px" }}
                  >
                    Cancel order
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    select
                    label="Tickets"
                    value={tickets}
                    onChange={(e) => setTickets(Number(e.target.value))}
                    size="small"
                    sx={{ width: 200 }}
                  >
                    {Array.from(
                      { length: thisTrip.available_tickets },
                      (_, i) => i + 1
                    ).map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignUp}
                    disabled={thisTrip.available_tickets === 0}
                    sx={{ width: 200 }}
                  >
                    Order Tickets
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Pictures Section with horizontal scrolling */}
        <Box sx={{ mb: 5, position: "relative" }}>
          <Typography variant="h6" gutterBottom>
            Pictures
          </Typography>

          {trip.images && trip.images.length > 0 ? (
            <Box sx={{ position: "relative" }}>
              {/* Left Arrow */}
              <IconButton
                onClick={() => {
                  const container = document.getElementById("pictures-scroll");
                  container.scrollBy({
                    left: -container.clientWidth,
                    behavior: "smooth",
                  });
                }}
                sx={{
                  position: "absolute",
                  left: -30,
                  top: "40%",
                  zIndex: 2,
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ArrowBackIos />
              </IconButton>

              {/* Scrollable Pictures */}
              <Box
                id="pictures-scroll"
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {trip.images.map((img, idx) => (
                  <Card
                    key={idx}
                    sx={{
                      minWidth: 220,
                      height: 200,
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={img}
                      alt={`Trip image ${idx + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Card>
                ))}
              </Box>

              {/* Right Arrow */}
              <IconButton
                onClick={() => {
                  const container = document.getElementById("pictures-scroll");
                  container.scrollBy({
                    left: container.clientWidth,
                    behavior: "smooth",
                  });
                }}
                sx={{
                  position: "absolute",
                  right: -30,
                  top: "40%",
                  zIndex: 2,
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>
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
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* About Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" gutterBottom>
            About this trip
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {trip.description}
          </Typography>
        </Box>
      </Container>
    </>
  );
}
// // // import {
// // //   Container,
// // //   Typography,
// // //   Box,
// // //   Grid,
// // //   Card,
// // //   CardMedia,
// // //   Divider,
// // //   TextField,
// // //   MenuItem,
// // //   Button,
// // //   IconButton,
// // // } from "@mui/material";
// // // import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import { useState, useEffect } from "react";
// // // import Navbar from "../components/Navbar";
// // // import {
// // //   addUserToTrip,
// // //   cancelTripOrder,
// // //   changeTripOrder,
// // //   fetchUserTrip,
// // // } from "../api/userTripApi";
// // // import TicketOrderDialog from "../components/AddTickets";

// // // export default function TripDetailsPage() {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   // Extract navigation state
// // //   const { trip, user, myTrip, tickets: initTickets, paymentSuccess } =
// // //     location.state || {};

// // //   // Redirect if not logged in
// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem("user");
// // //     if (!user && !storedUser) {
// // //       alert("You must be logged in to view trip details.");
// // //       navigate("/login");
// // //     }
// // //   }, [user, navigate]);

// // //   if (!user && !localStorage.getItem("user")) {
// // //     return <Typography>Redirecting to login...</Typography>;
// // //   }

// // //   // State
// // //   const [tickets, setTickets] = useState(initTickets || 1);
// // //   const [usertrip, setUsertrip] = useState({});
// // //   const [openAddTickets, setOpenAddTickets] = useState(false);
// // //   const [addingMore, setAddingMore] = useState(false);
// // //   const [thisTrip, setThisTrip] = useState(trip || {});
// // //   const [currentPage, setCurrentPage] = useState(0);

// // //   const imagesPerPage = 4;
// // //   const totalPages = Math.ceil((trip?.images?.length || 0) / imagesPerPage);

// // //   // Fetch user's tickets for this trip
// // //   async function getNumberOfTickets() {
// // //     if (user && trip) {
// // //       setUsertrip(await fetchUserTrip(user._id, trip._id));
// // //     }
// // //   }

// // //   useEffect(() => {
// // //     if (myTrip) {
// // //       getNumberOfTickets();
// // //     }
// // //   }, [openAddTickets]);

// // //   // Finalize Payment — handles both first-time and additional tickets
// // //   useEffect(() => {
// // //     if (!paymentSuccess || !tickets) return;

// // //     const finalizePayment = async () => {
// // //       try {
// // //         if (addingMore) {
// // //           // Updating existing trip booking
// // //           const newTrip = {
// // //             ...trip,
// // //             available_tickets: trip.available_tickets - tickets,
// // //           };

// // //           await changeTripOrder(usertrip, newTrip, tickets);
// // //           setThisTrip(newTrip);
// // //           await getNumberOfTickets();
// // //         } else {
// // //           // New trip booking
// // //           const userTrip = {
// // //             trip_id: trip._id,
// // //             user_id: user._id,
// // //             number_of_tickets: tickets,
// // //           };

// // //           await addUserToTrip(userTrip, trip);
// // //         }

// // //         alert("Payment successful! Redirecting to My Trips...");
// // //         navigate("/user-trips");
// // //       } catch (err) {
// // //         alert("Error finalizing order: " + err.message);
// // //       }
// // //     };

// // //     finalizePayment();
// // //   }, [paymentSuccess, tickets, addingMore]); // ✅ addingMore included

// // //   // Sign up for trip (new booking)
// // //   const handleSignUp = async () => {
// // //     setAddingMore(false); // Ensure clean state
// // //     navigate("/payment", { state: { trip, tickets, user } });
// // //   };

// // //   // Cancel existing booking
// // //   const handleDelete = async () => {
// // //     await cancelTripOrder(usertrip, trip);
// // //     navigate("/user-trips");
// // //   };

// // //   // Order extra tickets
// // //   const handleOrderTickets = (tickets_num) => {
// // //     setAddingMore(true);
// // //     setTickets(tickets_num);
// // //     navigate("/payment", { state: { trip, tickets: tickets_num, user } });
// // //   };

// // //   // Navigate images
// // //   const handlePrev = () => {
// // //     setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
// // //   };
// // //   const handleNext = () => {
// // //     setCurrentPage((prev) =>
// // //       prev < totalPages - 1 ? prev + 1 : prev
// // //     );
// // //   };

// // //   const currentImages =
// // //     thisTrip.images?.slice(
// // //       currentPage * imagesPerPage,
// // //       currentPage * imagesPerPage + imagesPerPage
// // //     ) || [];

// // //   return (
// // //     <>
// // //       <Navbar user={user} />

// // //       <Container maxWidth="lg" sx={{ mt: 4 }}>
// // //         {/* Trip Info + Sign Up */}
// // //         <Grid container spacing={12} sx={{ alignItems: "flex-start" }}>
// // //           {/* Left Side: Trip Info */}
// // //           <Grid item xs={12} md={7}>
// // //             <Typography variant="h4" gutterBottom>
// // //               {thisTrip.name}
// // //             </Typography>
// // //             <Typography variant="subtitle1" color="text.secondary" gutterBottom>
// // //               {thisTrip.location}
// // //             </Typography>

// // //             <Box sx={{ mt: 2 }}>
// // //               <Typography variant="body1">
// // //                 <strong>Start Date:</strong>{" "}
// // //                 {new Date(thisTrip.start_date).toLocaleDateString()}
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 <strong>End Date:</strong>{" "}
// // //                 {new Date(thisTrip.end_date).toLocaleDateString()}
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 <strong>Price:</strong> ${thisTrip.price}
// // //               </Typography>
// // //               <Typography variant="body1">
// // //                 <strong>Available Tickets:</strong> {thisTrip.available_tickets} /{" "}
// // //                 {thisTrip.max_tickets}
// // //               </Typography>
// // //             </Box>
// // //           </Grid>

// // //           {/* Right Side: Sign-Up / Ticket Ordering */}
// // //           <Grid item xs={12} md={5}>
// // //             <Box
// // //               sx={{
// // //                 display: "flex",
// // //                 flexDirection: "column",
// // //                 gap: 2,
// // //                 alignItems: "flex-start",
// // //                 mt: 1,
// // //               }}
// // //             >
// // //               {myTrip ? (
// // //                 <>
// // //                   <Typography
// // //                     variant="h6"
// // //                     align="center"
// // //                     sx={{ fontWeight: "bold", mt: 2 }}
// // //                   >
// // //                     You ordered {usertrip.number_of_tickets}{" "}
// // //                     {usertrip.number_of_tickets > 1 ? "tickets" : "ticket"}
// // //                   </Typography>

// // //                   <Button
// // //                     variant="contained"
// // //                     color="primary"
// // //                     onClick={() => setOpenAddTickets(true)}
// // //                     sx={{ width: "210px" }}
// // //                     disabled={thisTrip.available_tickets === 0}
// // //                   >
// // //                     Order more tickets
// // //                   </Button>

// // //                   <TicketOrderDialog
// // //                     open={openAddTickets}
// // //                     onClose={() => setOpenAddTickets(false)}
// // //                     onOrder={handleOrderTickets}
// // //                     trip={trip}
// // //                     user={user}
// // //                   />

// // //                   <Button
// // //                     variant="contained"
// // //                     color="primary"
// // //                     onClick={handleDelete}
// // //                     sx={{ width: "210px" }}
// // //                   >
// // //                     Cancel order
// // //                   </Button>
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <TextField
// // //                     select
// // //                     label="Tickets"
// // //                     value={tickets}
// // //                     onChange={(e) => setTickets(Number(e.target.value))}
// // //                     size="small"
// // //                     sx={{ width: 200 }}
// // //                   >
// // //                     {Array.from(
// // //                       { length: thisTrip.available_tickets },
// // //                       (_, i) => i + 1
// // //                     ).map((num) => (
// // //                       <MenuItem key={num} value={num}>
// // //                         {num}
// // //                       </MenuItem>
// // //                     ))}
// // //                   </TextField>

// // //                   <Button
// // //                     variant="contained"
// // //                     color="primary"
// // //                     onClick={handleSignUp}
// // //                     disabled={thisTrip.available_tickets === 0}
// // //                     sx={{ width: 200 }}
// // //                   >
// // //                     Order Tickets
// // //                   </Button>
// // //                 </>
// // //               )}
// // //             </Box>
// // //           </Grid>
// // //         </Grid>

// // //         <Divider sx={{ my: 4 }} />

// // //         {/* Pictures Section */}
// // //         <Box sx={{ mb: 5, position: "relative" }}>
// // //           <Typography variant="h6" gutterBottom>
// // //             Pictures
// // //           </Typography>

// // //           {trip.images && trip.images.length > 0 ? (
// // //             <Box sx={{ position: "relative" }}>
// // //               {/* Left Arrow */}
// // //               <IconButton
// // //                 onClick={() => {
// // //                   const container = document.getElementById("pictures-scroll");
// // //                   container.scrollBy({
// // //                     left: -container.clientWidth,
// // //                     behavior: "smooth",
// // //                   });
// // //                 }}
// // //                 sx={{
// // //                   position: "absolute",
// // //                   left: -30,
// // //                   top: "40%",
// // //                   zIndex: 2,
// // //                   backgroundColor: "white",
// // //                   "&:hover": { backgroundColor: "#f0f0f0" },
// // //                 }}
// // //               >
// // //                 <ArrowBackIos />
// // //               </IconButton>

// // //               {/* Scrollable Pictures */}
// // //               <Box
// // //                 id="pictures-scroll"
// // //                 sx={{
// // //                   display: "flex",
// // //                   overflowX: "auto",
// // //                   gap: 2,
// // //                   scrollBehavior: "smooth",
// // //                   "&::-webkit-scrollbar": { display: "none" },
// // //                 }}
// // //               >
// // //                 {trip.images.map((img, idx) => (
// // //                   <Card
// // //                     key={idx}
// // //                     sx={{
// // //                       minWidth: 220,
// // //                       height: 200,
// // //                       borderRadius: 2,
// // //                       flexShrink: 0,
// // //                     }}
// // //                   >
// // //                     <CardMedia
// // //                       component="img"
// // //                       image={img}
// // //                       alt={`Trip image ${idx + 1}`}
// // //                       sx={{
// // //                         width: "100%",
// // //                         height: "100%",
// // //                         objectFit: "cover",
// // //                       }}
// // //                     />
// // //                   </Card>
// // //                 ))}
// // //               </Box>

// // //               {/* Right Arrow */}
// // //               <IconButton
// // //                 onClick={() => {
// // //                   const container = document.getElementById("pictures-scroll");
// // //                   container.scrollBy({
// // //                     left: container.clientWidth,
// // //                     behavior: "smooth",
// // //                   });
// // //                 }}
// // //                 sx={{
// // //                   position: "absolute",
// // //                   right: -30,
// // //                   top: "40%",
// // //                   zIndex: 2,
// // //                   backgroundColor: "white",
// // //                   "&:hover": { backgroundColor: "#f0f0f0" },
// // //                 }}
// // //               >
// // //                 <ArrowForwardIos />
// // //               </IconButton>
// // //             </Box>
// // //           ) : trip.image_base64 ? (
// // //             <Card>
// // //               <CardMedia
// // //                 component="img"
// // //                 image={`data:image/jpeg;base64,${trip.image_base64}`}
// // //                 alt={trip.name}
// // //                 sx={{ height: 300, objectFit: "cover" }}
// // //               />
// // //             </Card>
// // //           ) : (
// // //             <Typography>No images available.</Typography>
// // //           )}
// // //         </Box>

// // //         <Divider sx={{ mb: 4 }} />

// // //         {/* About Section */}
// // //         <Box sx={{ mb: 5 }}>
// // //           <Typography variant="h6" gutterBottom>
// // //             About this trip
// // //           </Typography>
// // //           <Typography variant="body1" sx={{ mt: 1 }}>
// // //             {trip.description}
// // //           </Typography>
// // //         </Box>
// // //       </Container>
// // //     </>
// // //   );
// // // }


// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   Divider,
//   TextField,
//   MenuItem,
//   Button,
//   IconButton,
// } from "@mui/material";
// import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import {
//   addUserToTrip,
//   cancelTripOrder,
//   changeTripOrder,
//   fetchUserTrip,
// } from "../api/userTripApi";
// import TicketOrderDialog from "../components/AddTickets";

// export default function TripDetailsPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { trip, user, myTrip, paymentSuccess } = location.state || {};

//   // Redirect if not logged in
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!user && !storedUser) {
//       alert("You must be logged in to view trip details.");
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   if (!user && !localStorage.getItem("user")) {
//     return <Typography>Redirecting to login...</Typography>;
//   }

//   // Local state
//   const [tickets, setTickets] = useState(1);
//   const [userTrip, setUserTrip] = useState(null); // existing booking if any
//   const [openAddTickets, setOpenAddTickets] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [thisTrip, setThisTrip] = useState(trip || {});

//   // Pictures paging
//   const imagesPerPage = 4;
//   const totalPages = Math.ceil((trip?.images?.length || 0) / imagesPerPage);

//   // Fetch user's existing booking on mount
//   useEffect(() => {
//     const getUserTrip = async () => {
//       if (user && trip) {
//         const data = await fetchUserTrip(user._id, trip._id);
//         setUserTrip(data || null);
//       }
//     };
//     getUserTrip();
//   }, [user, trip]);

//   // ----------------- Finalize Payment -------------------
//   useEffect(() => {
//     if (!paymentSuccess) return;

//     // Use tickets and mode from router state explicitly
//     const ticketsToFinalize = location.state?.tickets || 1;
//     const isNewBooking = location.state?.isNewBooking ?? !userTrip?._id;

//     const finalize = async () => {
//       try {
//         if (isNewBooking) {
//           // First-time booking
//           await addUserToTrip(
//             { trip_id: trip._id, user_id: user._id, number_of_tickets: ticketsToFinalize },
//             trip
//           );
//         } else {
//           // Add tickets to existing booking
//           await changeTripOrder(
//             { ...userTrip, number_of_tickets: userTrip.number_of_tickets + ticketsToFinalize },
//             trip,
//             ticketsToFinalize
//           );
//         }

//         // Refresh userTrip
//         const updated = await fetchUserTrip(user._id, trip._id);
//         setUserTrip(updated);

//         alert("Payment successful! Redirecting to My Trips...");
//         navigate("/user-trips");
//       } catch (err) {
//         alert("Error finalizing order: " + err.message);
//       }
//     };

//     finalize();
//   }, [paymentSuccess, location.state, userTrip, trip, user, navigate]);

//   // ------------------------ Handlers ------------------------------
//   const handleSignUp = (tickets_num = tickets) => {
//     setTickets(tickets_num);
//     navigate("/payment", {
//       state: { trip, tickets: tickets_num, user, isNewBooking: true },
//     });
//   };

//   const handleDelete = async () => {
//     await cancelTripOrder(userTrip, trip);
//     setUserTrip(null);
//     navigate("/user-trips");
//   };

// const handleOrderTickets = (tickets_num) => {
//   setTickets(tickets_num);
//   navigate("/payment", {
//     state: { trip, tickets: tickets_num, user, isNewBooking: false },
//   });
// };

//   // Pictures navigation
//   const handlePrev = () => setCurrentPage((p) => (p > 0 ? p - 1 : p));
//   const handleNext = () =>
//     setCurrentPage((p) => (p < totalPages - 1 ? p + 1 : p));

//   const currentImages =
//     thisTrip.images?.slice(
//       currentPage * imagesPerPage,
//       currentPage * imagesPerPage + imagesPerPage
//     ) || [];

//   // ------------------------ Render -------------------------------
//   return (
//     <>
//       <Navbar user={user} />
//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Grid container spacing={12} sx={{ alignItems: "flex-start" }}>
//           {/* Left Side: Trip Info */}
//           <Grid item xs={12} md={7}>
//             <Typography variant="h4" gutterBottom>{thisTrip.name}</Typography>
//             <Typography variant="subtitle1" color="text.secondary" gutterBottom>{thisTrip.location}</Typography>
//             <Box sx={{ mt: 2 }}>
//               <Typography variant="body1"><strong>Start Date:</strong>{" "} {new Date(thisTrip.start_date).toLocaleDateString()}</Typography>
//               <Typography variant="body1"><strong>End Date:</strong>{" "} {new Date(thisTrip.end_date).toLocaleDateString()}</Typography>
//               <Typography variant="body1"><strong>Price:</strong> ${thisTrip.price}</Typography>
//               <Typography variant="body1"><strong>Available Tickets:</strong> {thisTrip.available_tickets} / {thisTrip.max_tickets}</Typography>
//             </Box>
//           </Grid>

//           {/* Right Side: Actions */}
//           <Grid item xs={12} md={5}>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start", mt: 1 }}>
//               {userTrip ? (
//                 <>
//                   <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mt: 2 }}>
//                     You ordered {userTrip.number_of_tickets} {userTrip.number_of_tickets > 1 ? "tickets" : "ticket"}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => setOpenAddTickets(true)}
//                     sx={{ width: "210px" }}
//                     disabled={thisTrip.available_tickets === 0}
//                   >
//                     Order more tickets
//                   </Button>
//                   <TicketOrderDialog
//                     open={openAddTickets}
//                     onClose={() => setOpenAddTickets(false)}
//                     onOrder={handleOrderTickets}
//                     trip={trip}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleDelete}
//                     sx={{ width: "210px" }}
//                   >
//                     Cancel order
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <TextField
//                     select
//                     label="Tickets"
//                     value={tickets}
//                     onChange={(e) => setTickets(Number(e.target.value))}
//                     size="small"
//                     sx={{ width: 200 }}
//                   >
//                     {Array.from({ length: thisTrip.available_tickets }, (_, i) => i + 1).map(num => (
//                       <MenuItem key={num} value={num}>{num}</MenuItem>
//                     ))}
//                   </TextField>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleSignUp(tickets)}
//                     disabled={thisTrip.available_tickets === 0}
//                     sx={{ width: 200 }}
//                   >
//                     Order Tickets
//                   </Button>
//                 </>
//               )}
//             </Box>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4 }} />

//         {/* Pictures Section */}
//         <Box sx={{ mb: 5, position: "relative" }}>
//           <Typography variant="h6" gutterBottom>Pictures</Typography>
//           {trip.images && trip.images.length > 0 ? (
//             <Box sx={{ position: "relative" }}>
//               <IconButton
//                 onClick={() => document.getElementById("pictures-scroll").scrollBy({ left: -220, behavior: "smooth" })}
//                 sx={{ position: "absolute", left: -30, top: "40%", zIndex: 2, backgroundColor: "white", "&:hover": { backgroundColor: "#f0f0f0" } }}
//               >
//                 <ArrowBackIos />
//               </IconButton>
//               <Box id="pictures-scroll" sx={{ display: "flex", overflowX: "auto", gap: 2, "&::-webkit-scrollbar": { display: "none" } }}>
//                 {trip.images.map((img, idx) => (
//                   <Card key={idx} sx={{ minWidth: 220, height: 200, borderRadius: 2, flexShrink: 0 }}>
//                     <CardMedia component="img" image={img} alt={`Trip image ${idx + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                   </Card>
//                 ))}
//               </Box>
//               <IconButton
//                 onClick={() => document.getElementById("pictures-scroll").scrollBy({ left: 220, behavior: "smooth" })}
//                 sx={{ position: "absolute", right: -30, top: "40%", zIndex: 2, backgroundColor: "white", "&:hover": { backgroundColor: "#f0f0f0" } }}
//               >
//                 <ArrowForwardIos />
//               </IconButton>
//             </Box>
//           ) : trip.image_base64 ? (
//             <Card>
//               <CardMedia component="img" image={`data:image/jpeg;base64,${trip.image_base64}`} alt={trip.name} sx={{ height: 300, objectFit: "cover" }} />
//             </Card>
//           ) : (
//             <Typography>No images available.</Typography>
//           )}
//         </Box>

//         <Divider sx={{ mb: 4 }} />

//         {/* About Section */}
//         <Box sx={{ mb: 5 }}>
//           <Typography variant="h6" gutterBottom>About this trip</Typography>
//           <Typography variant="body1" sx={{ mt: 1 }}>{trip.description}</Typography>
//         </Box>
//       </Container>
//     </>
//   );
// }


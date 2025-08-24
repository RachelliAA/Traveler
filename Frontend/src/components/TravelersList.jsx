// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   TableContainer,
//   Typography,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { fetchTravelersOfTrip } from "../api/UserTripApi";
// //Frontend\src\api\UserTripApi.js

// export default function TravelersList({ tripId }) {
//   const [travelers, setTravelers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!tripId) return;
//     async function loadTravelers() {
//       try {
//         setLoading(true);
//         const data = await fetchTravelersOfTrip(tripId);
//         setTravelers(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadTravelers();
//   }, [tripId]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   if (!travelers || travelers.length === 0) {
//     return <Typography variant="body2">No travelers have signed up yet.</Typography>;
//   }

//   return (
//     <TableContainer component={Paper} sx={{ mt: 2 }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Traveler ID</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Tickets</TableCell>
//             <TableCell>Purchase Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {travelers.map((t) => (
//             <TableRow key={t._id}>
//               <TableCell>{t.user_id?._id}</TableCell>
//               <TableCell>{t.user_id?.name || "Unnamed User"}</TableCell>
//               <TableCell>{t.user_id?.email}</TableCell>
//               <TableCell>{t.number_of_tickets}</TableCell>
//               <TableCell>{new Date(t.createdAt).toLocaleDateString()}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { fetchTravelersOfTrip } from "../api/userTripApi";
import { sendEmail } from "../api/EmailApi";

export default function TravelersList({ tripId, tripName }) {
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Email form state
  const [subject, setSubject] = useState("Trip Notification");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!tripId) return;
    async function loadTravelers() {
      try {
        setLoading(true);
        const data = await fetchTravelersOfTrip(tripId);
        setTravelers(data);

        // Pre-fill default message with trip info
        setMessage(
          `Hello Travelers,\n\nThis is a notification for your trip ${tripName} (ID: ${tripId}). we are excited to see you!\n\nThank you!`
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTravelers();
  }, [tripId]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);


  async function handleConfirmSend() {
  const emails = travelers.map((t) => t.user_id?.email).filter(Boolean);

  if (emails.length === 0) {
    alert("No valid emails found.");
    return;
  }

  try {
    setSending(true);
    const data = await sendEmail(emails, subject, message);

    if (data?.results && Array.isArray(data.results)) {
      const failed = data.results.filter(r => !r.success);

      if (failed.length === 0) {
        alert("✅ Emails sent successfully!");
        setOpenDialog(false);
      } else {
        alert(`⚠️ Some emails failed: ${failed.map(f => f.email).join(", ")}`);
      }
    } else {
      console.log("Unexpected response:", data);
      alert("⚠️ Unexpected response format from server");
    }
  } catch (err) {
    alert("Error sending emails: " + err.message);
  } finally {
    setSending(false);
  }
}



  // async function handleConfirmSend() {
  //   const emails = travelers.map((t) => t.user_id?.email).filter(Boolean);

  //   if (emails.length === 0) {
  //     alert("No valid emails found.");
  //     return;
  //   }

  //   try {
  //     setSending(true);
  //     // const data = await sendEmail(emails, subject, message);
  //     // if (data.success) {
  //     //   alert("Emails sent successfully!");
  //     //   setOpenDialog(false);
  //     // } else {
  //     //   alert("Failed to send emails: " + data.error);
  //     // }
  //     const data = await sendEmail(emails, subject, message);
  //     console.log("Email API response:", data);
  //     if (Array.isArray(data)) {
  //       const failed = data.filter(r => !r.success);
  //       if (failed.length === 0) {
  //         alert("✅ Emails sent successfully!");
  //         setOpenDialog(false);
  //       } else {
  //         alert(`⚠️ Some emails failed: ${failed.map(f => f.email).join(", ")}`);
  //       }
  //     } else {
  //       alert("⚠️ Unexpected response from server");
  //     }

  //   } catch (err) {
  //     alert("Error sending emails: " + err.message);
  //   } finally {
  //     setSending(false);
  //   }
  // }

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  if (!travelers || travelers.length === 0) {
    return <Typography variant="body2">No travelers have signed up yet.</Typography>;
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ mb: 2 }}
      >
        Send Email to All Travelers
      </Button>

      {/* Email Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Customize Email</DialogTitle>
        <DialogContent>
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={6}
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={sending}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSend}
            variant="contained"
            color="primary"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Traveler List Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Traveler ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tickets</TableCell>
              <TableCell>Purchase Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableRow-root:nth-of-type(odd)": {
                backgroundColor: "white",
              },
              "& .MuiTableRow-root:nth-of-type(even)": {
                backgroundColor: "#7fa1c6ff", // light blue
              },
            }}
          >
            {travelers.map((t) => (
              <TableRow key={t._id}>
                <TableCell>{t.user_id?._id}</TableCell>
                <TableCell>{t.user_id?.name || "Unnamed User"}</TableCell>
                <TableCell>{t.user_id?.email}</TableCell>
                <TableCell>{t.number_of_tickets}</TableCell>
                <TableCell>{new Date(t.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

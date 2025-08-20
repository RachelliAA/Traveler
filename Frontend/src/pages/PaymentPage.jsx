import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { trip, tickets, user } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [success, setSuccess] = useState(false);

  if (!trip || !tickets || !user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Invalid payment request.</Alert>
      </Container>
    );
  }

  const totalAmount = trip.price * tickets;

  const handlePayment = () => {
    // Mock payment processing
    if (cardNumber.length >= 12 && cvv.length >= 3) {
      setSuccess(true);

      setTimeout(() => {
        navigate("/user-trips", { replace: true });
      }, 2000); // after 2s, redirect back
    } else {
      alert("Please enter valid payment details.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Payment for {trip.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {tickets} ticket(s) × ${trip.price} ={" "}
            <strong>${totalAmount}</strong>
          </Typography>

          {!success ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
              <TextField
                label="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                fullWidth
              />
              <TextField
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                fullWidth
                type="password"
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
              >
                Pay ${totalAmount}
              </Button>
            </Box>
          ) : (
            <Alert severity="success" sx={{ mt: 3 }}>
              Payment successful! Redirecting to your trips...
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

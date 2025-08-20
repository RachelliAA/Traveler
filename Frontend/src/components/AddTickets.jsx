import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

const TicketOrderDialog = ({ open, onClose, onOrder }) => {
  const [ticketCount, setTicketCount] = useState(1);

  const handleOrder = () => {
    onOrder(ticketCount); // Trigger the order function with selected tickets
    onClose();           // Close the popup after ordering
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Order Tickets</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
          <Typography variant="body1" gutterBottom>
            How many tickets would you like to add?
          </Typography>
          <TextField
            type="number"
            value={ticketCount}
            onChange={(e) => setTicketCount(Number(e.target.value))}
            inputProps={{ min: 1 }}
            sx={{ width: "100px", mt: 1 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleOrder} color="primary" variant="contained">
          Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketOrderDialog;

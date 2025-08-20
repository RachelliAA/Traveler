import { Box, TextField, MenuItem, Button } from "@mui/material";

export default function UserTripActions({ trip, tickets, setTickets, onSignUp, onEdit, onCancel, myTrip }) {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 3 }}>
      {myTrip ? (
        <>
          <Button variant="contained" onClick={onEdit}>Order more tickets</Button>
          <Button variant="contained" color="error" onClick={onCancel}>Cancel order</Button>
        </>
      ) : (
        <>
          <TextField
            select
            label="Tickets"
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
            size="small"
            sx={{ width: 120 }}
          >
            {Array.from({ length: trip.available_tickets }, (_, i) => i + 1).map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            onClick={onSignUp}
            disabled={trip.available_tickets === 0}
          >
            Sign Up
          </Button>
        </>
      )}
    </Box>
  );
}

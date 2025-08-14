import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from "@mui/material";

export default function TripList({ trips, onSelectTrip }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Available Tickets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trips.map((trip) => (
            <TableRow
              key={trip._id}
              hover
              onClick={() => onSelectTrip(trip)}
              style={{ cursor: "pointer" }}
            >
              <TableCell>{trip.name}</TableCell>
              <TableCell>{trip.location}</TableCell>
              <TableCell>${trip.price}</TableCell>
              <TableCell>{trip.available_tickets}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

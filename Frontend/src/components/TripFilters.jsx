import { Box, TextField, Slider, Typography } from "@mui/material";

export default function TripFilters({
  filterText,
  setFilterText,
  startDate,
  setStartDate,
  availableTickets,
  setAvailableTickets,
}) {
  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
      <TextField
        label="Search by Name or Description"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        sx={{ minWidth: 250 }}
      />

      <TextField
        label="Filter by Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      <Box sx={{ width: 200 }}>
        <Typography gutterBottom>Available Tickets ≥ {availableTickets}</Typography>
        <Slider
          value={availableTickets}
          onChange={(e, val) => setAvailableTickets(val)}
          min={0}
          max={100} // adjust based on your data
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}

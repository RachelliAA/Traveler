import { Box, TextField, Slider, Typography, Button } from "@mui/material";

export default function TripFilters({
  filterText,
  setFilterText,
  startDate,
  setStartDate,
  availableTickets,
  setAvailableTickets,
  maxPrice,
  setMaxPrice
}) {
  const handleClearFilters = () => {
    setFilterText("");
    setStartDate("");
    setAvailableTickets(0);
    setMaxPrice(DEFAULT_MAX_PRICE); 
  };

  const DEFAULT_MAX_PRICE = 500;
  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
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

      <Box sx={{ width: 200, marginLeft: '25px' }}>
        <Typography gutterBottom>
          Available Tickets ≥ {availableTickets}
        </Typography>
        <Slider
          value={availableTickets}
          onChange={(e, val) => setAvailableTickets(val)}
          min={0}
          max={100} // adjust based on your data
          valueLabelDisplay="auto"
        />
      </Box>

        <Box sx={{ width: 200, marginLeft: '25px' }}>
        <Typography gutterBottom>
          Maximum price ≤ {maxPrice}
        </Typography>
        <Slider
          value={maxPrice}
          onChange={(e, val) => setMaxPrice(val)}
          min={0}
          max={500} // adjust based on your data
          step={10}
          valueLabelDisplay="auto"
        />
      </Box>

       

      {/* Clear All Filters Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClearFilters}
        sx={{ height: "fit-content", marginLeft: '30px' }}
      >
        Clear All
      </Button>
    </Box>
  );
}

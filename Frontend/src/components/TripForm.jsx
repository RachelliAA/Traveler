import { useState } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";

export default function TripForm({ onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    max_tickets: initialData.max_tickets || "",
    num_participants: initialData.num_participants || 0,
    price: initialData.price || "",
    start_date: initialData.start_date ? initialData.start_date.split("T")[0] : "",
    end_date: initialData.end_date ? initialData.end_date.split("T")[0] : "",
    location: initialData.location || "",
    available_tickets: initialData.available_tickets || "",
    image_base64: initialData.image_base64 || "",
    is_active: initialData.is_active ?? true,
  });

  const locations = [
    "north", "south", "east",
    "Jerusalem area", "Tel Aviv area", "Haifa area", "Eilat area"
  ];

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "grid", gap: 2, maxWidth: 500 }}
    >
      <TextField name="name" label="Trip Name" value={formData.name} onChange={handleChange} required />
      <TextField name="description" label="Description" value={formData.description} onChange={handleChange} multiline />
      <TextField name="max_tickets" type="number" label="Max Tickets" value={formData.max_tickets} onChange={handleChange} required />
      <TextField name="available_tickets" type="number" label="Available Tickets" value={formData.available_tickets} onChange={handleChange} />
      <TextField name="price" type="number" label="Price" value={formData.price} onChange={handleChange} required />
      <TextField name="start_date" type="date" label="Start Date" value={formData.start_date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
      <TextField name="end_date" type="date" label="End Date" value={formData.end_date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
      <TextField select name="location" label="Location" value={formData.location} onChange={handleChange} required>
        {locations.map((loc) => (
          <MenuItem key={loc} value={loc}>{loc}</MenuItem>
        ))}
      </TextField>
      <TextField name="image_base64" label="Image (Base64)" value={formData.image_base64} onChange={handleChange} />
      
      <Box mt={2}>
        <Button type="submit" variant="contained" sx={{ mr: 1 }}>
          Save
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

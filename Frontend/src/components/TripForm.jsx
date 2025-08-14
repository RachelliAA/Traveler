// import { useState, useEffect } from "react";
// import { Box, TextField, MenuItem, Button, Typography, IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function TripForm({ onSubmit, onCancel, initialData = {} }) {
//   const [formData, setFormData] = useState({
//     name: initialData.name || "",
//     description: initialData.description || "",
//     max_tickets: initialData.max_tickets || "",
//     num_participants: initialData.num_participants ?? 0,
//     price: initialData.price || "",
//     start_date: initialData.start_date ? initialData.start_date.split("T")[0] : "",
//     end_date: initialData.end_date ? initialData.end_date.split("T")[0] : "",
//     location: initialData.location || "",
//     available_tickets: initialData.available_tickets || initialData.max_tickets || "",
//     images_base64: initialData.images_base64 || [],
//     is_active: initialData.is_active ?? true,
//   });

//   const [tripDays, setTripDays] = useState("---");

//   const locations = [
//     "north", "south", "east",
//     "Jerusalem area", "Tel Aviv area", "Haifa area", "Eilat area"
//   ];

//   function handleChange(e) {
//     const { name, value } = e.target;
//     let updatedForm = { ...formData, [name]: value };

//     if (name === "max_tickets") {
//       updatedForm.available_tickets = value;
//     }

//     setFormData(updatedForm);
//   }

//   function handleImageUpload(e) {
//     const files = Array.from(e.target.files);

//     Promise.all(
//       files.map(file =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onload = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(file); // convert to base64
//         })
//       )
//     ).then(base64Images => {
//       setFormData(prev => ({
//         ...prev,
//         images_base64: [...prev.images_base64, ...base64Images]
//       }));
//     });
//   }

//   function removeImage(index) {
//     setFormData(prev => ({
//       ...prev,
//       images_base64: prev.images_base64.filter((_, i) => i !== index)
//     }));
//   }

//   useEffect(() => {
//     if (formData.start_date && formData.end_date) {
//       const start = new Date(formData.start_date);
//       const end = new Date(formData.end_date);
//       const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
//       setTripDays(days > 0 ? days : "---");
//     } else {
//       setTripDays("---");
//     }
//   }, [formData.start_date, formData.end_date]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     onSubmit(formData);
//   }

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ display: "grid", gap: 2, maxWidth: 500 }}
//     >
//       <TextField name="name" label="Trip Name" value={formData.name} onChange={handleChange} required />
//       <TextField name="description" label="Description" value={formData.description} onChange={handleChange} multiline />
//       <TextField name="max_tickets" type="number" label="Max Tickets" value={formData.max_tickets} onChange={handleChange} required />
//       <TextField name="available_tickets" type="number" label="Available Tickets" value={formData.available_tickets} onChange={handleChange} />
//       <TextField name="price" type="number" label="Price" value={formData.price} onChange={handleChange} required />

//       <TextField
//         name="start_date"
//         type="date"
//         label="Start Date"
//         value={formData.start_date}
//         onChange={handleChange}
//         InputLabelProps={{ shrink: true }}
//         required
//       />

//       <TextField
//         name="end_date"
//         type="date"
//         label="End Date"
//         value={formData.end_date}
//         onChange={handleChange}
//         InputLabelProps={{ shrink: true }}
//         required
//         inputProps={{
//           min: formData.start_date || undefined
//         }}
//       />

//       <Typography variant="body2" color="primary">
//         Trip length: {tripDays} days
//       </Typography>

//       <TextField select name="location" label="Location" value={formData.location} onChange={handleChange} required>
//         {locations.map((loc) => (
//           <MenuItem key={loc} value={loc}>{loc}</MenuItem>
//         ))}
//       </TextField>

//       {/* Image Upload */}
//       <Button variant="outlined" component="label">
//         Upload Images
//         <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />
//       </Button>

//       {/* Image Previews */}
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//         {formData.images_base64.map((img, idx) => (
//           <Box key={idx} sx={{ position: "relative", display: "inline-block" }}>
//             <img src={img} alt={`Trip image ${idx + 1}`} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 4 }} />
//             <IconButton
//               size="small"
//               onClick={() => removeImage(idx)}
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 right: 0,
//                 background: "rgba(255,255,255,0.7)"
//               }}
//             >
//               <DeleteIcon fontSize="small" />
//             </IconButton>
//           </Box>
//         ))}
//       </Box>

//       <Box mt={2}>
//         <Button type="submit" variant="contained" sx={{ mr: 1 }}>
//           Save
//         </Button>
//         <Button variant="outlined" onClick={onCancel}>
//           Cancel
//         </Button>
//       </Box>
//     </Box>
//   );
// }



import { useState } from "react";
import { Box, TextField, MenuItem, Button, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TripForm({ onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    max_tickets: initialData.max_tickets || "",
    num_participants: initialData.num_participants ?? 0,
    price: initialData.price || "",
    start_date: initialData.start_date ? initialData.start_date.split("T")[0] : "",
    end_date: initialData.end_date ? initialData.end_date.split("T")[0] : "",
    location: initialData.location || "",
    available_tickets: initialData.available_tickets || initialData.max_tickets || "",
    images: initialData.images || [],
    is_active: initialData.is_active ?? true,
  });

  const [tripDays, setTripDays] = useState("---");
  const [newImageUrl, setNewImageUrl] = useState("");

  const locations = [
    "north", "south", "east",
    "Jerusalem area", "Tel Aviv area", "Haifa area", "Eilat area"
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };
    if (name === "max_tickets") updatedForm.available_tickets = value;
    setFormData(updatedForm);
  }

  function addImageUrl() {
    if (newImageUrl.trim()) {
      setFormData({ ...formData, images: [...formData.images, newImageUrl.trim()] });
      setNewImageUrl("");
    }
  }

  function removeImageUrl(index) {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2, maxWidth: 500 }}>
      <TextField name="name" label="Trip Name" value={formData.name} onChange={handleChange} required />
      <TextField name="description" label="Description" value={formData.description} onChange={handleChange} multiline />
      <TextField name="max_tickets" type="number" label="Max Tickets" value={formData.max_tickets} onChange={handleChange} required />
      <TextField name="available_tickets" type="number" label="Available Tickets" value={formData.available_tickets} onChange={handleChange} />
      <TextField name="price" type="number" label="Price" value={formData.price} onChange={handleChange} required />

      <TextField name="start_date" type="date" label="Start Date" value={formData.start_date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
      <TextField name="end_date" type="date" label="End Date" value={formData.end_date} onChange={handleChange} InputLabelProps={{ shrink: true }} required inputProps={{ min: formData.start_date || undefined }} />

      <Typography variant="body2" color="primary">Trip length: {tripDays} days</Typography>

      <TextField select name="location" label="Location" value={formData.location} onChange={handleChange} required>
        {locations.map((loc) => (
          <MenuItem key={loc} value={loc}>{loc}</MenuItem>
        ))}
      </TextField>

      {/* Image URLs section */}
      <Box>
        <Typography variant="h6">Images</Typography>
        {formData.images.map((url, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1} mt={1}>
            <img src={url} alt={`Trip ${index}`} style={{ width: 60, height: 40, objectFit: "cover" }} />
            <Typography variant="body2">{url}</Typography>
            <IconButton onClick={() => removeImageUrl(index)} size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        <Box display="flex" gap={1} mt={1}>
          <TextField
            label="Image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={addImageUrl}>Add</Button>
        </Box>
      </Box>

      <Box mt={2}>
        <Button type="submit" variant="contained" sx={{ mr: 1 }}>Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
}

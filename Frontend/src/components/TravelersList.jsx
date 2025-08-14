import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function TravelersList({ travelers }) {
  if (!travelers || travelers.length === 0) {
    return <Typography variant="body2">No travelers have signed up yet.</Typography>;
  }

  return (
    <List dense>
      {travelers.map((traveler) => (
        <ListItem key={traveler._id}>
          <ListItemText
            primary={traveler.name || "Unnamed User"}
            secondary={traveler.email || ""}
          />
        </ListItem>
      ))}
    </List>
  );
}

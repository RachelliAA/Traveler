import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Avatar,
  Box,
  Divider,
} from "@mui/material";

export default function ProfileDialog({ open, onClose, user }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Profile</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <Avatar sx={{ width: 80, height: 80 }}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h6">{user?.name || "Unknown User"}</Typography>
          <Divider sx={{ width: "100%", my: 1 }} />

          <Box sx={{ width: "100%" }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {user?.email || "-"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Phone:</strong> {user?.phone_number || "-"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Address:</strong> {user?.address || "-"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {user?.is_admin ?<strong>Admin:</strong>:<></>}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

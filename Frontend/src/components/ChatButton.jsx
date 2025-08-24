import { useState } from "react";
import { Fab, Drawer, Box } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import Chatbox from "./ChatBox";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button (bottom-right) */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1300,
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Drawer (left sidebar style) */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "300px", // slim sidebar
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
          },
        }}
      >
        <Box p={2} height="100%">
          <Chatbox userId="user123" />
        </Box>
      </Drawer>
    </>
  );
}

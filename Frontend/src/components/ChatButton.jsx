// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// import { useState } from "react";
// import { Fab, Drawer, Box } from "@mui/material";
// import ChatIcon from "@mui/icons-material/Chat";
// import Chatbox from "./ChatBox";

// export default function ChatButton() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Floating Chat Button */}
//       <Fab
//         color="primary"
//         aria-label="chat"
//         onClick={() => setOpen(true)}
//         sx={{
//           position: "fixed",
//           bottom: 20,
//           right: 20,
//           zIndex: 1300
//         }}
//       >
//         <ChatIcon />
//       </Fab>

//       {/* Chat Drawer (bottom sheet style) */}
//       <Drawer
//         anchor="bottom-right"
//         open={open}
//         onClose={() => setOpen(false)}
//         PaperProps={{
//           sx: {
//             height: "60vh", // covers part of page
//             borderTopLeftRadius: "16px",
//             borderTopRightRadius: "16px"
//           }
//         }}
//       >
//         <Box p={2} height="100%">
//           <Chatbox userId="user123" />
//         </Box>
//       </Drawer>
//     </>
//   );
// }



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

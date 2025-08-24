import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import TripDetails from "./TripDetails";
import UserTrips from "./UserTrips";
import Login from "./Login";
import Register from "./Register";
import RootPage from "./RootPage";
import Footer from "../components/Footer";
import EditProfile from "./EditProfile";
import AdminTripDetails from "./AdminTripDetails";
import PaymentPage from "./PaymentPage";
import { Box } from "@mui/material";
import ProfileDialog from "../components/Profile";
import NotFoundPage from "./NotFoundPage";

export default function App() {
  const mockAdmin = { id: "1", name: "Admin", role: "admin" };
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || mockAdmin
  );

  const handleLogin = (loggedInUser) => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          paddingBottom: "80px", // give space so content isn't hidden behind footer
          boxSizing: "border-box",
        }}
      >
        {/* Main content */}
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/trip/:tripId" element={<TripDetails />} />
          <Route path="/profile" element={<ProfileDialog/>} />
          <Route path="/UserTrips" element={<UserTrips />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
          <Route path="/user-trips" element={<UserTrips />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/adminTripDetails/:tripId" element={<AdminTripDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<NotFoundPage />} />


        </Routes>

        {/* Fixed Footer */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 1200, // keeps it above other content
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Router>
  );
}

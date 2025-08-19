
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
export default function App() {
  const mockAdmin = { id: "1", name: "Admin", role: "admin" };
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || mockAdmin
  );

  const handleLogin = (loggedInUser) => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser); // <-- update state immediately
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/trip/:tripId" element={<TripDetails />} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/UserTrips" element={<UserTrips />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard user={user} />} />
        <Route path="/user-trips" element={<UserTrips />} />
        <Route path="/edit" element={<EditProfile />} />

      </Routes>
      <Footer/>
    </Router>
  );
}

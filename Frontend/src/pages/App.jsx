// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './Homepage'
// import Login from './Login'
// import NewTrip from './newTrip'
// import TripDetails from './TripDetails'
// import Profile from './Profile'

// import { CssBaseline } from '@mui/material'

// function App() {
//   return (
//     <>
//       <CssBaseline />
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />

//         <Route path="/home" element={<Home />} />
//         <Route path="/newtrip" element={<NewTrip />} />
//         <Route path="/details" element={<TripDetails />} />
//         <Route path="/profile" element={<Profile />} />

//       </Routes>
//     </Router>
//     </>
//   )
// }

// export default App




// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminDashboard from "./AdminDashboard";
// import TripDetails from "./TripDetails";
// // import Navbar from "../components/Navbar";
// import UserTrips from "./UserTrips";
// import Login from "./Login";
// import Register from "./Register"; 
// import RootPage from "./RootPage"; 


// export default function App() {
//   const mockAdmin = { id: "1", name: "Admin", role: "admin" };
//   const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || mockAdmin;
//   const handleLogout = () => {
//     console.log("Logged out");
//     // You can also clear auth state here
//   };

//   return (
//     <Router>
//       {/* <Navbar user={mockAdmin} onLogout={handleLogout} /> */}
//       <Routes>
//         {/* <Route path="/rootpage" element={<RootPage />} /> */}
//         <Route path="/" element={<RootPage/>} />
//         <Route path="/trip/:tripId" element={<TripDetails />} />
//         <Route path="/profile" element={<div>Profile Page</div>} />
//         <Route path="/UserTrips" element={<UserTrips />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin" element={<AdminDashboard user={storedUser}/>} />
//         <Route path="/user-trips" element={<UserTrips />} />
//       </Routes>
//     </Router>
//   );
// }



import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import TripDetails from "./TripDetails";
import UserTrips from "./UserTrips";
import Login from "./Login";
import Register from "./Register"; 
import RootPage from "./RootPage"; 
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function App() {
  const mockAdmin = { id: "1", name: "Admin", role: "admin" };
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || mockAdmin
  );

  const handleLogin = (loggedInUser) => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser); // <-- update state immediately
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <Router>
      {/* <Navbar user={user} onLogout={handleLogout} /> */}
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/trip/:tripId" element={<TripDetails />} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/UserTrips" element={<UserTrips />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard user={user} />} />
        <Route path="/user-trips" element={<UserTrips />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

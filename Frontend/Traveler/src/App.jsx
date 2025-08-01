import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Homepage'
import Login from './pages/Login'
import NewTrip from './pages/newTrip'
import TripDetails from './pages/TripDetails'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/newtrip" element={<NewTrip />} />
        <Route path="/details" element={<TripDetails />} />
       
      </Routes>
    </Router>
  )
}

export default App


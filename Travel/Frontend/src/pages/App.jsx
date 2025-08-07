import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Homepage'
import Login from './Login'
import NewTrip from './newTrip'
import TripDetails from './TripDetails'
import Profile from './Profile'

import { CssBaseline } from '@mui/material'

function App() {
  return (
    <>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/newtrip" element={<NewTrip />} />
        <Route path="/details" element={<TripDetails />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
    </>
  )
}

export default App


import { useState } from 'react'
import {
  Box,
  Container,
  Tabs,
  Tab,
  Typography,
  Grid,
  Button,
} from '@mui/material'
import Profile from './Profile'

const availableTrips = [
  { id: 1, title: 'Beach Paradise', location: 'Thailand', image: 'https://via.placeholder.com/300x200' },
  { id: 2, title: 'Mountain Adventure', location: 'Switzerland', image: 'https://via.placeholder.com/300x200' },
]

const myTrips = [
  { id: 3, title: 'City Lights', location: 'New York', image: 'https://via.placeholder.com/300x200' },
]

export default function HomePage() {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex)
  }

  const displayedTrips = tabIndex === 0 ? availableTrips : myTrips

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Profile />

        {/* Tabs */}
       <Tabs
  value={tabIndex}
  onChange={handleTabChange}
  centered
  indicatorColor="primary"
  textColor="primary"
  sx={{ mb: 2 }}
>
  <Tab label="Available Trips" />
  <Tab label="My Trips" />
</Tabs>
<Box mt={2}>
  <Grid container spacing={3}>
    {displayedTrips.map((trip) => (
      <Grid item xs={12} sm={6} md={4} key={trip.id}>
       <Button>trip</Button> 
      </Grid>
    ))}
  </Grid>
</Box>

     

        {/* Optional: No trips message */}
        {displayedTrips.length === 0 && (
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 4 }}>
            No trips to display.
          </Typography>
        )}
      </Box>
    </Container>
  )
}


/**
 * Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

 * here will be home
      To Do
      make a profile component with user info
      at the beginning of page requests user from db or already gets it from login??
      sqaures with trips 
      different filters
      section with my trips
      notifications
 */
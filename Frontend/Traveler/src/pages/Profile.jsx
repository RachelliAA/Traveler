import { useState } from 'react'
import { Card, CardContent, Typography, Avatar, Collapse, Box } from '@mui/material'

export default function Profile() {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = () => setExpanded((prev) => !prev)

  return (
    <Card onClick={handleToggle} sx={{ mb: 4, cursor: 'pointer' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src="https://via.placeholder.com/80"
          sx={{ width: 64, height: 64, mr: 2 }}
        />
        <Box>
          <Typography variant="h6">John Doe</Typography>
          <Collapse in={expanded}>
            <Typography variant="body2" color="text.secondary">
              Traveler. Photographer. Adventure seeker. Click to collapse.
            </Typography>
          </Collapse>
        </Box>
      </CardContent>
    </Card>
  )
}

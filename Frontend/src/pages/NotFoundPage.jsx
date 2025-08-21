import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?travel,adventure")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        },
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h2" gutterBottom>
          404 — off having fun🎉
        </Typography>
        <Typography variant="h6" paragraph>
          Looks like this page missed its bus🛺, your next adventure is just a click away.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/')}
          sx={{
            mt: 3,
            paddingX: 4,
            paddingY: 1.5,
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          🧭 Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
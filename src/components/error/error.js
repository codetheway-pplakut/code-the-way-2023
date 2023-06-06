import React from 'react';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Avatar, Box, Button, Typography, Container } from '@mui/material';
import { pink } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export function Error() {
  const navigate = useNavigate();
  const onHomeClick = () => navigate('/');

  return (
    <Container maxWidth="xs" sx={{ height: '100%' }}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: pink[500], mx: 'auto', mb: 2 }}>
          <PageviewIcon />
        </Avatar>
        <Typography variant="h4" sx={{ m: 2 }}>
          Oops.
        </Typography>
        <Typography paragraph sx={{ mx: 2 }}>
          Sorry, an unexpected error has occurred.
        </Typography>
        <Button
          onClick={onHomeClick}
          startIcon={<HomeIcon />}
          variant="contained"
        >
          Home
        </Button>
      </Box>
    </Container>
  );
}

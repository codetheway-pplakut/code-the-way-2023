import React from 'react';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Layout } from '../layout/layout';

export function Error() {
  const navigate = useNavigate();
  const onHomeClick = () => navigate('/');
  const error = useRouteError();

  return (
    <Layout>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: pink[500], mx: 'auto', mb: 2 }}>
            <PageviewIcon />
          </Avatar>
          <Typography variant="h4" sx={{ m: 2 }}>
            Oops.
          </Typography>
          <Typography paragraph sx={{ mx: 2 }}>
            Sorry, an unexpected error has occurred.
          </Typography>
          <Typography paragraph color="text.secondary" sx={{ mx: 2 }}>
            <em>{error.statusText || error.message}</em>
          </Typography>
          <Button
            onClick={onHomeClick}
            startIcon={<HomeIcon />}
            variant="contained"
          >
            Home
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

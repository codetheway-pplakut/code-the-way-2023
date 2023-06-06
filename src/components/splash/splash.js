import { Typography, Box, Avatar, Button, Container } from '@mui/material';
import React from 'react';
import ComputerIcon from '@mui/icons-material/Computer';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layout/layout';

export function Splash() {
  const navigate = useNavigate();
  const onLoginClick = () => navigate('/login');

  return (
    <Layout scrollable={false}>
      <Container
        maxWidth="md"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Avatar sx={{ mx: 'auto', mb: 2 }}>
          <ComputerIcon />
        </Avatar>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Welcome!
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }} color="text.secondary">
          Code The Way 2023
        </Typography>
        <Typography paragraph>
          This is a starter project using{' '}
          <a href="https://react.dev/" target="_blank" rel="noreferrer">
            React
          </a>{' '}
          and{' '}
          <a href="https://mui.com/" target="_blank" rel="noreferrer">
            MUI
          </a>{' '}
          for Code The Way 2023. This project contains a few pages and
          components to get you started.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={onLoginClick}>
            Login
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}

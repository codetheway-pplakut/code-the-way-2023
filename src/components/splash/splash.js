import { Typography, Box, Button, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layout/layout';
import logo from '../../assets/images/logo.png';
import '../../styles/index.scss';

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
        <img src={logo} alt="lead2change logo" />
        <Typography
          variant="h3"
          sx={{ mb: 2, marginTop: '10px' }}
          color="text.secondary"
        >
          Student Management System
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

import React, { useState } from 'react';
import '../../styles/index.scss';
import {
  Typography,
  Container,
  Box,
  Button,
  TextField,
  Avatar,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import { Layout } from '../layout/layout';
import logo from '../../assets/images/logo.png';
import { CircularProgressOverlay } from '../circular-progress-overlay/circular-progress-overlay';
import { useAuthentication } from '../../contexts/authentication-context/authentication-context';
import { ForgotPasswordModal } from '../login/forgot-password-modal';
import { LayoutError } from '../layout/layout-error/layout-error';

export function Splash() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setLogin(true);
  };
  const navigate = useNavigate();

  const authentication = useAuthentication();
  const { signIn, isLoading } = authentication;

  const submitDisabled = !username || !password;
  const showErrorMessage = Boolean(errorMessage);

  const onSuccessCallback = () => navigate('/students');
  const onFailureCallback = (e) => {
    const message =
      e?.response?.data?.message || e?.message || 'An error occurred.';
    setErrorMessage(message);
  };
  const onSubmit = () => {
    signIn({
      onFailureCallback,
      onSuccessCallback,
      password,
      username,
    });
  };
  const onClick = () => setError('');

  if (login) {
    return (
      <React.Fragment>
        <CircularProgressOverlay active={isLoading} />
        <Layout scrollable={false} showBackButton={false}>
          <Container
            maxWidth="xs"
            sx={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ mx: 'auto', mb: 2 }}>
              <LockIcon />
            </Avatar>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Login
            </Typography>
            {showErrorMessage && (
              <Typography sx={{ color: pink[500] }}>{errorMessage}</Typography>
            )}
            <TextField
              fullWidth
              label="Email"
              onChange={(event) => setUsername(event.target.value)}
              required
              sx={{ my: 1 }}
              type="email"
              value={username}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
              sx={{ my: 1 }}
              type="password"
              value={password}
              variant="outlined"
            />
            <ForgotPasswordModal onError={setError} />
            <Button
              disabled={submitDisabled}
              onClick={onSubmit}
              size="large"
              sx={{ mt: 2 }}
              variant="contained"
            >
              Login
            </Button>
          </Container>
        </Layout>
      </React.Fragment>
    );
  }
  if (error)
    return (
      <LayoutError
        title="Error loading."
        label={error}
        onRetryClick={onClick}
      />
    );

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
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}

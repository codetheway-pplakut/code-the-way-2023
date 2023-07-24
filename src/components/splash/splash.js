import React, { useState } from 'react';
import '../../styles/index.scss';
import { Typography, Container, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import { Layout } from '../layout/layout';
import logo from '../../assets/images/logo.png';
import { useAuthentication } from '../../contexts/authentication-context/authentication-context';
import { ForgotPasswordModal } from '../login/forgot-password-modal';
import { LayoutError } from '../layout/layout-error/layout-error';

export function Splash() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const authentication = useAuthentication();
  const { signIn } = authentication;

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

  if (error)
    return (
      <LayoutError
        title="Error loading."
        label={error}
        onRetryClick={onClick}
      />
    );
  return (
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
        <img src={logo} alt="lead2change logo" />
        {showErrorMessage && (
          <Typography sx={{ mt: '5vh', color: pink[500] }}>
            {errorMessage}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Email"
          onChange={(event) => setUsername(event.target.value)}
          required
          sx={{ mb: 1, mt: '5vh' }}
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
        <Button
          disabled={submitDisabled}
          onClick={onSubmit}
          size="large"
          sx={{ mt: 2 }}
          variant="contained"
        >
          Login
        </Button>
        <ForgotPasswordModal onError={setError} />
      </Container>
    </Layout>
  );
}

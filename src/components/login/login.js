import {
  Typography,
  Container,
  Button,
  TextField,
  Avatar,
} from '@mui/material';
import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { CircularProgressOverlay } from '../circular-progress-overlay/circular-progress-overlay';
import { Layout } from '../layout/layout';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitDisabled = !username || !password;

  const onSubmit = async () => {
    setIsLoading(true);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
  };

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
          <TextField
            fullWidth
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
            required
            sx={{ my: 1 }}
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
            fullWidth
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

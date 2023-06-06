import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Layout } from '../../layout/layout';
import { EntitlementRestricted } from '../../entitlement-restricted/entitlement-restricted';
import { useAuthentication } from '../../../contexts/authentication-context/authentication-context';

export function Protected() {
  const authentication = useAuthentication();
  const { username, id } = authentication;

  return (
    <EntitlementRestricted>
      <Layout
        title="Protected Layout"
        subTitle="This layout is protected by an entitlement."
        secondary={
          <React.Fragment>
            <Typography variant="h5">Current User</Typography>
            <List>
              <ListItem>
                <ListItemText primary={`username: ${username}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`id: ${id}`} />
              </ListItem>
            </List>
          </React.Fragment>
        }
      >
        <Typography paragraph>
          This screen is wrapped in the <code>EntitlementRestricted</code>{' '}
          component. This component prevents a user from accessing the screen if
          they do not have the correct entitlement.
        </Typography>
        <Typography paragraph>
          If the user doens&apos;t have the correct entitlement, they will be
          redirected to the login screen.
        </Typography>
      </Layout>
    </EntitlementRestricted>
  );
}

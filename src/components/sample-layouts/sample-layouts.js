import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Layout } from '../layout/layout';

export function SampleLayouts() {
  return (
    <Layout title="Sample Layouts">
      <Typography paragraph>
        The following are a few sample layouts to help you get started with your
        application:
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            LinkComponent={RouterLink}
            to="/sample-layouts/standard"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Standard Layout" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            LinkComponent={RouterLink}
            to="/sample-layouts/tabular"
          >
            <ListItemIcon>
              <BackupTableIcon />
            </ListItemIcon>
            <ListItemText primary="Tabular Layout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Layout>
  );
}

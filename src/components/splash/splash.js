import React from 'react';
import { Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LayersIcon from '@mui/icons-material/Layers';
import { Layout } from '../layout/layout';

export function Splash() {
  return (
    <Layout
      title="Welcome!"
      subTitle="A Starter Application for Code The Way"
      actions={[
        <Button
          key={1}
          size="small"
          startIcon={<ThumbUpAltIcon />}
          sx={{ ml: 1 }}
          variant="outlined"
        >
          Action 1
        </Button>,
        <Button
          key={2}
          size="small"
          startIcon={<AddReactionIcon />}
          sx={{ ml: 1 }}
          variant="outlined"
        >
          Action 2
        </Button>,
        <Button
          key={3}
          size="small"
          startIcon={<LayersIcon />}
          sx={{ ml: 1 }}
          variant="outlined"
        >
          Action 3
        </Button>,
      ]}
    />
  );
}

import React from 'react';
import { Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LayersIcon from '@mui/icons-material/Layers';
import { Layout } from '../layout/layout';

export function Splash() {
  return (
    <Layout
      title="Welcome!"
      subTitle="A Starter Application for Code The Way"
      secondary="test"
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
    >
      <Typography variant="h4">Lorem ipsum dolor sit amet</Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus
        quam a malesuada feugiat. Praesent ipsum tortor, consectetur in aliquam
        sed, sollicitudin eget turpis. Etiam a commodo dolor. Cras dignissim
        fermentum dui non dignissim. Nunc in pharetra lorem. In augue neque,
        eleifend ut nisl nec, molestie malesuada quam.
      </Typography>
      <Typography variant="h6">Lorem ipsum dolor sit amet</Typography>
      <Typography paragraph>
        Aenean elementum finibus sem vitae facilisis. Nunc ullamcorper ut ante
        nec elementum. Ut non magna velit. Fusce ornare felis dui, sed fermentum
        orci tempor non. Phasellus iaculis sollicitudin mi, sit amet interdum mi
        molestie vel. Nam libero libero, venenatis ut gravida id, vulputate a
        mauris. Donec eget risus quis elit elementum auctor.
      </Typography>
      <Typography variant="h4">Etiam metus risus</Typography>
      <Typography paragraph>
        Etiam metus risus, consectetur id est vel, sollicitudin pellentesque
        ante. Sed pharetra rhoncus diam, ut rutrum eros. Curabitur eu turpis
        magna. Pellentesque vel sapien convallis, egestas felis placerat,
        hendrerit arcu. Mauris ac lectus vitae libero cursus bibendum.
        Vestibulum congue leo venenatis, placerat odio in, commodo nunc. Fusce
        sed dui volutpat, molestie nibh a, elementum mauris. Duis ante nibh,
        consectetur in posuere vel, tempor vitae tellus. Sed luctus varius orci,
        ut tempus augue luctus et.
      </Typography>
      <Typography variant="h4">Lorem ipsum dolor sit amet</Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus
        quam a malesuada feugiat. Praesent ipsum tortor, consectetur in aliquam
        sed, sollicitudin eget turpis. Etiam a commodo dolor. Cras dignissim
        fermentum dui non dignissim. Nunc in pharetra lorem. In augue neque,
        eleifend ut nisl nec, molestie malesuada quam. Aenean elementum finibus
        sem vitae facilisis. Nunc ullamcorper ut ante nec elementum. Ut non
        magna velit. Fusce ornare felis dui, sed fermentum orci tempor non.
        Phasellus iaculis sollicitudin mi, sit amet interdum mi molestie vel.
        Nam libero libero, venenatis ut gravida id, vulputate a mauris. Donec
        eget risus quis elit elementum auctor.
      </Typography>
      <Typography variant="h4">Etiam metus risus</Typography>
      <Typography paragraph>
        Etiam metus risus, consectetur id est vel, sollicitudin pellentesque
        ante. Sed pharetra rhoncus diam, ut rutrum eros. Curabitur eu turpis
        magna. Pellentesque vel sapien convallis, egestas felis placerat,
        hendrerit arcu. Mauris ac lectus vitae libero cursus bibendum.
        Vestibulum congue leo venenatis, placerat odio in, commodo nunc. Fusce
        sed dui volutpat, molestie nibh a, elementum mauris. Duis ante nibh,
        consectetur in posuere vel, tempor vitae tellus. Sed luctus varius orci,
        ut tempus augue luctus et.
      </Typography>
    </Layout>
  );
}

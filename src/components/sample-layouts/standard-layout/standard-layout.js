import React from 'react';
import { Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LayersIcon from '@mui/icons-material/Layers';
import { Layout } from '../../layout/layout';
import { EntitlementRestricted } from '../../entitlement-restricted/entitlement-restricted';

function Secondary() {
  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Secondary Content
      </Typography>
      <Typography paragraph>
        This is a section that should be used for <strong>secondary</strong>{' '}
        content on a page. It is usually additional context for the{' '}
        <strong>primary</strong> content, but not necessary.
      </Typography>
      <Typography paragraph>
        You can add this section to your screen by adding content to the{' '}
        <code>secondary</code> prop on the <code>Layout</code> component. If you
        do not have any content in the <code>secondary</code> prop, it will not
        be rendered.
      </Typography>
    </React.Fragment>
  );
}

export function StandardLayout() {
  return (
    <EntitlementRestricted>
      <Layout
        title="Standard Layout"
        subTitle="This layout can be used for most screens."
        secondary={<Secondary />}
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
        <Typography paragraph>
          This sample screen is using the <code>Layout</code> component. The{' '}
          <code>Layout</code> component is designed to speed the construction of
          new screens without having to rebuild common infrastructure each time.
        </Typography>

        <Typography variant="h4">Sections</Typography>
        <Typography paragraph>
          The <code>Layout</code> component is broken up into several sections:
        </Typography>
        <Typography variant="h5">Title</Typography>
        <Typography paragraph>
          This is the main title of the screen. It will render when you&apos;ve
          set a value for the <code>title</code> prop.
        </Typography>
        <Typography variant="h5">Children</Typography>
        <Typography paragraph>
          This is the primary content of the screen. It will render when
          you&apos;ve set a value for the <code>children</code> prop.
        </Typography>
        <Typography variant="h5">Actions</Typography>
        <Typography paragraph>
          These are the buttons rendered in the top, right-hand side of the
          screen. This section will render when you&apos;ve set an array of
          components for the <code>actions</code> prop. For consistency,
          it&apos;s best to use the <code>Button</code> components when adding
          actions.
        </Typography>
        <Typography variant="h5">Secondary</Typography>
        <Typography paragraph>
          This is the section on the right-hand side of the primary content.
        </Typography>
      </Layout>
    </EntitlementRestricted>
  );
}

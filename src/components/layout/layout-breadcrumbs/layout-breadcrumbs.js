import { Breadcrumbs, Typography, Link, Box } from '@mui/material';
import React from 'react';
import { Link as RouterLink, useMatches } from 'react-router-dom';

export function LayoutBreadcrumbs() {
  const matches = useMatches();

  const breadcrumbs = matches.filter(({ handle }) =>
    Boolean(handle?.breadcrumb)
  );

  if (breadcrumbs.length < 2) return <Box sx={{ flex: 1 }} />;

  return (
    <Breadcrumbs sx={{ flex: 1, mx: 2 }}>
      {breadcrumbs.map(({ handle, id, pathname }, index) => {
        const { breadcrumb } = handle;
        const isLast = index === breadcrumbs.length - 1;

        if (isLast) {
          return (
            <Typography key={id} color="text.primary">
              {breadcrumb}
            </Typography>
          );
        }

        return (
          <Link
            color="inherit"
            component={RouterLink}
            key={id}
            to={pathname}
            underline="hover"
          >
            {breadcrumb}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

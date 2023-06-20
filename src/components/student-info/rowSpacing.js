import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Paper, Tab, Tabs, Toolbar } from '@mui/material';

export default function RowAndColumnSpacing() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    border: 1,
  };
  const tabStyle = {
    bgcolor: '#004cbb',
    color: '#ffffff',
    position: 'relative',
    ml: '2%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 150,
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item container direction="row" alignItems="center">
        <Grid item width="55%" alignItems="center">
          <Grid container direction="row" sx={style} alignItems="center">
            <Grid item xs={2} sx={tabStyle}>
              <Tab value="one" label="Contact Info" alignItems="center" />
            </Grid>
            <Grid item xs={2} sx={tabStyle}>
              <Tab value="two" label="Goals and Careers" alignItems="center" />
            </Grid>
            <Grid item xs={2} sx={tabStyle}>
              <Tab value="three" label="Interview Info" alignItems="center" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item alignItems="center" width="45%">
          <Grid container direction="row" alignItems="center" sx={style}>
            <Grid item>
              <Tab value="four" label="Communication Log" alignItems="center" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <Box sx={style} width="55%" bgcolor="#ff00ff" height="40%" />
      </Grid>
    </Grid>
  );
}

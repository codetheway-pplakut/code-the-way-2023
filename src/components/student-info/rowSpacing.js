import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, IconButton, Paper, Tab, Tabs, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GenericModal from '../coaches/modal-component';
import InfoBox from './info-box';

export default function RowAndColumnSpacing() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    flexShrink: 1,
    display: 'inline-flex',
    overflow: 'auto',
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
  const iconStyle = {
    bgcolor: '#004cbb',
    color: '#ffffff',
    position: 'relative',
    ml: '2%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item container direction="row" alignItems="center" minWidth="100%">
        <Grid item width="50%" alignItems="center" mr="5%">
          <Grid container direction="row" sx={style} alignItems="center">
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              width="100%"
              centered
            >
              <Grid item xs={2} sx={tabStyle}>
                <Tab value="one" label="Contact Info" alignItems="center" />
              </Grid>
              <Grid item xs={2} sx={tabStyle}>
                <Tab
                  value="two"
                  label="Goals and Careers"
                  alignItems="center"
                />
              </Grid>
              <Grid item xs={2} sx={tabStyle}>
                <Tab value="three" label="Interview Info" alignItems="center" />
              </Grid>
            </Tabs>
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          width="45%"
          sx={style}
          justifyContent="space-evenly"
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >
            <Grid item sx={tabStyle} mr="20%">
              <Tab
                value="four"
                label="Communication Log"
                alignItems="center"
                disabled
              />
            </Grid>
            <Grid item>
              <GenericModal buttonIcon={<AddIcon sx={iconStyle} />} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <InfoBox />
      </Grid>
    </Grid>
  );
}

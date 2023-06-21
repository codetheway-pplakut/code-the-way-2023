import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, IconButton, Paper, Tab, Tabs, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GenericModal from '../coaches/modal-component';
import InfoBox from './info-box';

export default function RowAndColumnSpacing() {
  const [value, setValue] = React.useState('one');
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
    // '&:hover': {
    //   bgcolor: '#ffb570',
    //   opacity: 1,
    // },
    '&.Mui-selected': {
      color: '#ffffff',
      bgcolor: '#ff7c00',
    },
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
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="true"
              width="100%"
            >
              <Tab sx={tabStyle} value="one" label="Contact Info" />

              <Tab
                sx={tabStyle}
                value="two"
                label="Goals and Careers"
                alignItems="center"
              />

              <Tab
                sx={tabStyle}
                value="three"
                label="Interview Info"
                alignItems="center"
              />
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

      {value === 'one' && (
        <Grid item container direction="row" alignItems="center">
          <InfoBox />
        </Grid>
      )}
      {value === 'two' && (
        <Grid item container direction="row" alignItems="center">
          Placeholder
        </Grid>
      )}
    </Grid>
  );
}

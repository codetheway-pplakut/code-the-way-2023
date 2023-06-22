import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function CommunicationBox(props) {
  const { date, coach, topic, notes } = props;
  const boxStyle = {
    position: 'relative',
    bgcolor: '#ff7c00',
    color: '#ffffff',
    borderColor: '#000000',
    height: 'auto',
    width: '43.3vw',
    minHeight: '250px',
    flexShrink: 1,
    display: 'flex',
    gridColumn: '1 / -1',
  };
  const textStyle = {
    mt: '13px',
    ml: '28px',
    fontSize: '1.2vw',
  };
  const headerStyle = {
    mt: '0.1px',

    ml: '28px',
    fontSize: '2.2vw',
    position: 'relative',
  };
  const noteStyle = {
    mb: '10px',
    mx: '30px',
    fontSize: '0.5vw',
  };

  return (
    <Box sx={boxStyle}>
      <Grid container direction="row" sx={{ border: 1 }}>
        <Grid item xs={5}>
          <Typography sx={textStyle}> Date Created: {date}</Typography>
        </Grid>
        <Grid item xs={0}>
          <Typography sx={textStyle}>Coach: {coach} </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography sx={headerStyle}>{topic}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={noteStyle}>{notes}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

CommunicationBox.defaultProps = {
  date: null,
  coach: null,
  topic: null,
  notes: null,
};

CommunicationBox.propTypes = {
  date: PropTypes.string,
  coach: PropTypes.string,
  topic: PropTypes.string,
  notes: PropTypes.string,
};

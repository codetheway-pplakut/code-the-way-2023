import React from 'react';
import PropTypes, { array } from 'prop-types';
import { Grid } from '@mui/material';
import CommunicationBox from './communication-box';

export function CommunicationLog(props) {
  const { data } = props;

  return (
    <Grid
      container
      item
      xs={2}
      sx={{
        position: 'relative',

        width: '100vw',
        mr: '0.1%',
        ml: '0.1%',

        maxWidth: '47%',
      }}
    >
      {data.map((dat) => (
        <Grid key={dat[0]} item sx={{ my: '10px' }}>
          <CommunicationBox
            key={dat[0]}
            date={dat[1]}
            coach={dat[2]}
            topic={dat[3]}
            notes={dat[4]}
          />
        </Grid>
      ))}
    </Grid>
  );
}

CommunicationLog.propTypes = {
  data: PropTypes.arrayOf(array).isRequired,
};

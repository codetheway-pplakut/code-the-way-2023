import { Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { AspirationsCard, AspirationsCardHeader } from '../aspirations-card';

export function Interview(props) {
  const { interview, onSaveSuccess } = props;

  return (
    <Grid padding="5px">
      <AspirationsCard>
        <AspirationsCardHeader
          header={interview.interview.interviewName}
          backgroundColor="#f2f2f2"
        />
        <Grid
          container
          alignItems="center"
          sx={{
            px: '2vw',
            py: '2vh',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          }}
        />
      </AspirationsCard>
    </Grid>
  );
}

Interview.propTypes = {
  interview: PropTypes.object,
  onSaveSuccess: PropTypes.func,
};

Interview.defaultProps = {
  interview: {},
  onSaveSuccess: null,
};

import React from 'react';
import { Grid, Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

export function AspirationsCard(props) {
  return (
    <Box sx={{ borderRadius: '10px', boxShadow: 2, mb: 2 }}>
      <Grid container direction="column">
        {props.children}
      </Grid>
    </Box>
  );
}

AspirationsCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export function AspirationsCardHeader(props) {
  const { header } = props;
  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        px: '2vw',
        py: '1vh',
        bgcolor: '#F0F0F0',
        borderRadius: '10px 10px 0px 0px',
      }}
    >
      <Grid item xs={6}>
        <Typography fontSize={20} fontWeight="medium" color="#505050">
          {header}
        </Typography>
      </Grid>
      {props.children}
    </Grid>
  );
}

AspirationsCardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
};

AspirationsCardHeader.defaultProps = {
  header: null,
};

export function AspirationsCardFooter(props) {
  return (
    <React.Fragment>
      <Divider variant="middle" sx={{ borderBottomWidth: '2px' }} />
      <Grid
        container
        alignItems="center"
        sx={{
          px: '2vw',
          py: '2vh',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
        }}
      >
        {props.children}
      </Grid>
    </React.Fragment>
  );
}

AspirationsCardFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

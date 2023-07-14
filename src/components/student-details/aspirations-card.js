import React from 'react';
import { Grid, Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * AspirationsCard (aspirations-card.js) is the main box for goal and career cards.
 */
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

/**
 * AspirationsCardHeader (aspirations-card.js) is the header for AspirationsCard.
 * It should be placed inside the AspirationsCard, and can contain more than just a header, with room for 6 more grid units of content.
 */
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

/**
 * AspirationsCardFooter (aspirations-card.js) is the footer for AspirationsCard.
 * It should be placed inside the AspirationsCard, and can contain more than just one piece of information, with room for a full row (12 grid units) of content.
 */
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

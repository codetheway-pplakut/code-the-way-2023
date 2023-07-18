import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  AspirationsCard,
  AspirationsCardHeader,
  AspirationsCardFooter,
} from '../aspirations-card';

export default function CommunicationBox(props) {
  const { coachName, topic, description, created } = props;

  return (
    <Box py="3px">
      <AspirationsCard>
        <AspirationsCardHeader header={topic} />
        <Grid container direction="row" />
        <Grid
          container
          sx={{
            px: '2vw',
            py: '2vh',
            minHeight: '10vh',
          }}
        >
          <Typography>{description}</Typography>
        </Grid>
        <AspirationsCardFooter>
          <Grid container>
            <Grid item xs={6}>
              <Typography>{`Coach Name: ${coachName}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Date: {dayjs(created).format('MMM DD, YYYY')}
              </Typography>
            </Grid>
          </Grid>
        </AspirationsCardFooter>
      </AspirationsCard>
    </Box>
  );
}

CommunicationBox.defaultProps = {
  created: null,
  coachName: null,
  topic: null,
  description: null,
};

CommunicationBox.propTypes = {
  created: PropTypes.string,
  coachName: PropTypes.string,
  topic: PropTypes.string,
  description: PropTypes.string,
};

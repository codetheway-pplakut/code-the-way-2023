import { Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { DeleteCareerModal, EditCareerModal } from './career-modals';
import { AspirationsCard, AspirationsCardHeader } from '../aspirations-card';

export function Career(props) {
  const { career, onSaveSuccess } = props;

  return (
    <Grid padding="5px">
      <AspirationsCard>
        <AspirationsCardHeader header={career.specificCareer}>
          <Grid item xs={4}>
            <Typography>{`Cluster: ${career.careerCluster}`}</Typography>
          </Grid>
          <Grid item xs={1}>
            <EditCareerModal career={career} onSaveSuccess={onSaveSuccess} />
          </Grid>
          <Grid item xs={1}>
            <DeleteCareerModal career={career} onSaveSuccess={onSaveSuccess} />
          </Grid>
        </AspirationsCardHeader>
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
          <Grid item xs={6}>
            <Typography>
              College Bound: {career.collegeBound ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Tech. College Bound: {career.technicalCollegeBound ? 'Yes' : 'No'}
            </Typography>
          </Grid>
        </Grid>
      </AspirationsCard>
    </Grid>
  );
}

Career.propTypes = {
  career: PropTypes.object,
  onSaveSuccess: PropTypes.func,
};

Career.defaultProps = {
  career: [],
  onSaveSuccess: null,
};

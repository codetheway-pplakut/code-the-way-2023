import { Grid, Typography, Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { DeleteCareerModal, EditCareerModal } from './career-modals';

export function Career(props) {
  const { career, onSaveSuccess } = props;

  return (
    <Box sx={{ borderRadius: '10px', boxShadow: 2, mb: 2 }}>
      <Grid container direction="column">
        <Grid
          item
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ px: '2vw', py: '1vh', bgcolor: '#F0F0F0' }}
        >
          <Grid item xs={6}>
            <Typography fontSize={20} fontWeight="medium" color="#505050">
              {career.specificCareer}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{`Cluster: ${career.careerCluster}`}</Typography>
          </Grid>
          <Grid item xs={1}>
            <EditCareerModal career={career} onSaveSuccess={onSaveSuccess} />
          </Grid>
          <Grid item xs={1}>
            <DeleteCareerModal career={career} onSaveSuccess={onSaveSuccess} />
          </Grid>
        </Grid>
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
      </Grid>
    </Box>
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

import { Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { DeleteCareerModal, EditCareerModal } from './career-modals';
import { AspirationsCard, AspirationsCardHeader } from '../aspirations-card';

export function Career(props) {
  const { career, onSaveSuccess } = props;

  let careerCluster;
  switch (career.careerCluster) {
    case 1:
      careerCluster = 'Agriculture, Food & Natural Resources';
      break;
    case 2:
      careerCluster = 'Architecture & Construction';
      break;
    case 3:
      careerCluster = 'Arts, A/V Technology & Communications';
      break;
    case 4:
      careerCluster = 'Business Management & Administration';
      break;
    case 5:
      careerCluster = 'Education & Training';
      break;
    case 6:
      careerCluster = 'Finance';
      break;
    case 7:
      careerCluster = 'Government & Public Administration';
      break;
    case 8:
      careerCluster = 'Health Science';
      break;
    case 9:
      careerCluster = 'Hospitality & Tourism';
      break;
    case 10:
      careerCluster = 'Human Services';
      break;
    case 11:
      careerCluster = 'Information Technology';
      break;
    case 12:
      careerCluster = 'Law, Public Safety, Corrections & Security';
      break;
    case 13:
      careerCluster = 'Manufacturing';
      break;
    case 14:
      careerCluster = 'Marketing';
      break;
    case 15:
      careerCluster = 'Science, Technology, Engineering & Mathematics';
      break;
    case 16:
      careerCluster = 'Transportation, Distribution & Logistics';
      break;
    case 17:
      careerCluster = 'Other';
      break;
    default:
      careerCluster = 'None';
  }
  return (
    <Grid padding="5px">
      <AspirationsCard>
        <AspirationsCardHeader header={career.specificCareer}>
          <Grid item xs={4}>
            <Typography>Cluster: {careerCluster}</Typography>
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

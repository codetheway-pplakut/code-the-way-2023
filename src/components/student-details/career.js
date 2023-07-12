import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { DeleteCareerModal, EditCareerModal } from './career-modals';

export function Career(props) {
  const { career, onSaveSuccess } = props;
  const [careerId, setCareerId] = React.useState('');
  const [collegeBound, setCollegeBound] = React.useState(false);
  const [careerCluster, setCareerCluster] = React.useState(0);
  const [specificCareer, setSpecificCareer] = React.useState('');
  const [technicalCollegeBound, setTechnicalCollegeBound] =
    React.useState(false);

  useEffect(() => {
    setCareerId(career.id);
    setCollegeBound(career.collegeBound ? career.collegeBound : false);
    setCareerCluster(career.careerCluster ? career.careerCluster : 0);
    setSpecificCareer(career.specificCareer ? career.specificCareer : '');
    setTechnicalCollegeBound(
      career.technicalCollegeBound ? career.technicalCollegeBound : false
    );
  }, [career]);

  return (
    <Grid container direction="column" sx={{ border: '1px solid black' }}>
      <Grid
        item
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ border: '2px solid gray' }}
      >
        <Typography>Career: {specificCareer}</Typography>
        <DeleteCareerModal career={career} onSaveSuccess={onSaveSuccess} />
        <EditCareerModal career={career} onSaveSuccess={onSaveSuccess} />
      </Grid>
      <Grid
        item
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ border: '2px solid gray' }}
      >
        <Typography> College Bound: {collegeBound ? 'Yes' : 'No'}</Typography>
        <Typography>
          Technical College Bound: {technicalCollegeBound ? 'Yes' : 'No'}
        </Typography>
      </Grid>
      <Grid
        item
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ border: '2px solid gray' }}
      >
        {/* Career Cluster being stored as number means no description for this */}
        <Typography> Career Cluster: {careerCluster}</Typography>
      </Grid>
    </Grid>
  );
}

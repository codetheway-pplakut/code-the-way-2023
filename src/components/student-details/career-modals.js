import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Menu, MenuItem, TextField } from '@mui/material';
import uuid from 'react-uuid';
import propTypes from 'prop-types';
import GenericModal from '../shared/generic-modal';
import { addCareerHandler } from './careersHandler';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';

export function AddCareerModal(props) {
  const { student, onSaveSuccess } = props;

  const [collegeBound, setCollegeBound] = React.useState(false);
  const [careerCluster, setCareerCluster] = React.useState(0);
  const [specificCareer, setSpecificCareer] = React.useState('');
  const [technicalCollegeBound, setTechnicalCollegeBound] =
    React.useState(false);

  const requestSubmit = async () => {
    await addCareerHandler(
      uuid(),
      student.id,
      collegeBound,
      careerCluster,
      specificCareer,
      technicalCollegeBound
    );
    if (onSaveSuccess) onSaveSuccess();
  };
  const handleClusterChange = (event) => {
    setCareerCluster(event.target.value);
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Add Career"
      onActionButtonClick={requestSubmit}
      openButtonIcon={<AddIcon />}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="spaceBetween"
      >
        <Grid item mb={2}>
          <TextField
            select
            label="College Bound"
            style={{ width: 200 }}
            onChange={(event) => setCollegeBound(event.target.value)}
            value={collegeBound}
          >
            <MenuItem value={Boolean(1)}>Yes</MenuItem>
            <MenuItem value={Boolean(0)}>No</MenuItem>
          </TextField>
        </Grid>
        <Grid item mb={2}>
          <TextField
            select
            label="Career Cluster"
            onChange={handleClusterChange}
            value={careerCluster}
            style={{ width: 200 }}
          >
            <MenuItem value={0}> No Career Selected </MenuItem>
            <MenuItem value={1}>
              01-Agriculture, Food & Natural Resources
            </MenuItem>
            <MenuItem value={2}> 02-Architecture & Construction</MenuItem>
            <MenuItem value={3}>
              03-Arts, A/V Technology & Communications
            </MenuItem>
            <MenuItem value={4}>
              04-Business Management & Administration
            </MenuItem>
            <MenuItem value={5}> 05-Education & Training</MenuItem>
            <MenuItem value={6}> 06-Finance</MenuItem>
            <MenuItem value={7}>07-Government & Public Administration</MenuItem>
            <MenuItem value={8}> 08-Health Science</MenuItem>
            <MenuItem value={9}> 09-Hospitality & Tourism</MenuItem>
            <MenuItem value={10}> 10-Human Services</MenuItem>
            <MenuItem value={11}> 11-Information Technology</MenuItem>
            <MenuItem value={12}>
              12-Law, Public Safety, Corrections & Security
            </MenuItem>
            <MenuItem value={13}> 13-Manufacturing</MenuItem>
            <MenuItem value={14}> 14-Marketing</MenuItem>
            <MenuItem value={15}>
              15-Science, Technology, Engineering & Mathematics
            </MenuItem>
            <MenuItem value={16}>
              16-Transportation, Distribution & Logistics
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item mb={2}>
          <TextFieldWithErrorMessage
            label="Specific Career"
            onChange={(value) => setSpecificCareer(value)}
            value={specificCareer}
          />
        </Grid>
        <Grid item mb={2}>
          <TextField
            select
            label="Technical College Bound"
            onChange={(event) => setTechnicalCollegeBound(event.target.value)}
            style={{ width: 200 }}
            value={technicalCollegeBound}
          >
            <MenuItem value={Boolean(1)}>Yes</MenuItem>
            <MenuItem value={Boolean(0)}>No</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </GenericModal>
  );
}

AddCareerModal.propTypes = {
  student: propTypes.func,
  onSaveSuccess: propTypes.func,
};
AddCareerModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
};

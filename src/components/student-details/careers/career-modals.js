import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Grid, MenuItem, TextField, Typography, Checkbox } from '@mui/material';
import uuid from 'react-uuid';
import propTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { flattenDeep } from 'lodash';
import { validate } from 'validate.js';
import { GenericModal } from '../../shared/generic-modal';
import {
  addCareerHandler,
  deleteCareerHandler,
  editCareerHandler,
} from './careerHandlers';

export function AddCareerModal(props) {
  const { student, onSaveSuccess } = props;

  const [collegeBound, setCollegeBound] = React.useState(false);
  const [careerCluster, setCareerCluster] = React.useState(0);
  const [specificCareer, setSpecificCareer] = React.useState('');
  const [technicalCollegeBound, setTechnicalCollegeBound] =
    React.useState(false);

  const [specificCareerEdit, setSpecificCareerEdit] = React.useState(false);
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
  const validator = validate(
    { specificCareer },
    {
      specificCareer: {
        presence: { allowEmpty: false },
      },
    }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const actionButtonDisabled = Boolean(messages.length);

  return (
    <GenericModal
      actionButtonTitle="Confirm"
      actionButtonColor="submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Add Career"
      onActionButtonClick={requestSubmit}
      actionButtonDisabled={actionButtonDisabled}
      openButtonIcon={<AddIcon />}
      modalMessage="Fill out the fields below to add a career."
    >
      <Grid container alignItems="center" spacing={2} px={4} py={2}>
        <Grid item xs={12}>
          <TextField
            label="Specific Career"
            onChange={(event) => setSpecificCareer(event.target.value)}
            value={specificCareer}
            errorText={
              specificCareer.length < 1 ? 'Enter Specific Career Choice' : ' '
            }
            error={specificCareer.length < 1 && specificCareerEdit}
            onBlur={() => setSpecificCareerEdit(true)}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            label="Career Cluster"
            onChange={handleClusterChange}
            value={careerCluster}
            style={{ width: '100%' }}
          >
            <MenuItem value={0}> No Cluster Selected </MenuItem>
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
            <MenuItem value={17}>Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item container>
          <Grid item xs={5}>
            <Grid container alignItems="center" marginLeft={2}>
              <Typography>College Bound</Typography>
              <Checkbox
                checked={collegeBound === true}
                onChange={(event) => setCollegeBound(!!event.target.checked)}
              />
            </Grid>
          </Grid>

          <Grid item xs={7}>
            <Grid container alignItems="center" marginLeft={2}>
              <Typography>Technical College Bound</Typography>
              <Checkbox
                checked={technicalCollegeBound === true}
                onChange={(event) =>
                  setTechnicalCollegeBound(!!event.target.checked)
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </GenericModal>
  );
}

export function DeleteCareerModal(props) {
  const { career, onSaveSuccess } = props;
  // TODO add try catch
  const requestDelete = async () => {
    try {
      await deleteCareerHandler(career);
    } catch (error) {
      console.log(error);
    } finally {
      if (onSaveSuccess) onSaveSuccess();
    }
  };

  return (
    <GenericModal
      modalHeadingTitle="Delete Career"
      modalMessage="Are you sure you want to delete this career?"
      cancelButtonTitle="Cancel"
      actionButtonTitle="Delete"
      actionButtonColor="archive"
      onActionButtonClick={requestDelete}
      openButtonIcon={<DeleteIcon />}
    />
  );
}

DeleteCareerModal.propTypes = {
  career: propTypes.object,
  onSaveSuccess: propTypes.func,
};
DeleteCareerModal.defaultProps = {
  career: undefined,
  onSaveSuccess: undefined,
};

export function EditCareerModal(props) {
  const { career, onSaveSuccess } = props;

  const [collegeBound, setCollegeBound] = React.useState(false);
  const [careerCluster, setCareerCluster] = React.useState(0);
  const [specificCareer, setSpecificCareer] = React.useState('');
  const [technicalCollegeBound, setTechnicalCollegeBound] =
    React.useState(false);

  const [specificCareerEdit, setSpecificCareerEdit] = React.useState(false);

  useEffect(() => {
    setCollegeBound(career.collegeBound);
    setCareerCluster(career.careerCluster);
    setSpecificCareer(career.specificCareer);
    setTechnicalCollegeBound(career.technicalCollegeBound);
  }, [career]);

  const requestSubmit = async () => {
    await editCareerHandler(
      career.id,
      career.studentId,
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

  const validator = validate(
    { specificCareer },
    {
      specificCareer: {
        presence: { allowEmpty: false },
      },
    }
  );

  const messages = flattenDeep(Object.values(validator || {}));

  const actionButtonDisabled = Boolean(messages.length);
  return (
    <GenericModal
      actionButtonTitle="Submit"
      actionButtonColor="submit"
      cancelButtonTitle="Cancel"
      modalHeadingTitle="Edit Career"
      onActionButtonClick={requestSubmit}
      actionButtonDisabled={actionButtonDisabled}
      openButtonIcon={<EditIcon />}
      modalMessage="Fill out the fields below to edit a career."
    >
      <Grid container alignItems="center" spacing={2} px={4} py={2}>
        <Grid item xs={12}>
          <TextField
            label="Specific Career"
            onChange={(event) => setSpecificCareer(event.target.value)}
            value={specificCareer}
            errorText={
              specificCareer.length < 1 ? 'Enter Specific Career Choice' : ' '
            }
            error={specificCareer.length < 1 && specificCareerEdit}
            onBlur={() => setSpecificCareerEdit(true)}
            required
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            label="Career Cluster"
            onChange={handleClusterChange}
            value={careerCluster}
            style={{ width: '100%' }}
          >
            <MenuItem value={0}> No Cluster Selected </MenuItem>
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
            <MenuItem value={17}>Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item container>
          <Grid item xs={5}>
            <Grid container alignItems="center" marginLeft={2}>
              <Typography>College Bound</Typography>
              <Checkbox
                checked={collegeBound === true}
                onChange={(event) => setCollegeBound(!!event.target.checked)}
              />
            </Grid>
          </Grid>

          <Grid item xs={7}>
            <Grid container alignItems="center" marginLeft={2}>
              <Typography>Technical College Bound</Typography>
              <Checkbox
                checked={technicalCollegeBound === true}
                onChange={(event) =>
                  setTechnicalCollegeBound(!!event.target.checked)
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </GenericModal>
  );
}

EditCareerModal.propTypes = {
  career: propTypes.object,
  onSaveSuccess: propTypes.func,
};
EditCareerModal.defaultProps = {
  career: undefined,
  onSaveSuccess: undefined,
};

AddCareerModal.propTypes = {
  student: propTypes.object,
  onSaveSuccess: propTypes.func,
};
AddCareerModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
};

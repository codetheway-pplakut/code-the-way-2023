import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import EditStudentInfoModal from './edit-student-info-modal';
import Goal from './goal';
import { altGetStudentGoalsHandler } from './goalsHandler';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';
import { AddGoalModal } from './goal-modals';

export function StudentInfoBox(props) {
  const { student, onReload, isParent } = props;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [CellPhone, setCellPhone] = useState('');
  const [Email, setEmail] = useState('');
  // Student-specific information:
  const [StudentDateOfBirth, setStudentDateOfBirth] = useState('');
  const [Address, setAddress] = useState('');
  const [ApartmentNumber, setApartmentNumber] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState(''); // check if creating state var causes error
  const [ZipCode, setZipCode] = useState('');
  const [HomePhone, setHomePhone] = useState('');

  // useEffect gets names again when the student is updated
  useEffect(() => {
    if (isParent) {
      setFirstName(student.parentFirstName);
      setLastName(student.parentLastName);
      // birthday??
      setAddress(student.address);
      setApartmentNumber(student.parentApartmentNumber);
      setCity(student.parentCity);
      setState(student.parentState);
      setZipCode(student.parentZipCode);
      setCellPhone(student.parentCellPhone);
      setHomePhone(student.parentHomePhone);
      setEmail(student.parentEmail);
    } else {
      setFirstName(student.studentFirstName);
      setLastName(student.studentLastName);
      setStudentDateOfBirth(student.studentDateOfBirth);
      setAddress(student.studentAddress);
      setApartmentNumber(student.studentApartmentNumber);
      setCity(student.studentCity);
      setState(student.studentState);
      setZipCode(student.studentZipCode);
      setCellPhone(student.studentCellPhone);
      setHomePhone(student.studentHomePhone);
      setEmail(student.studentEmail);
    }
  }, [isParent, student]);

  return (
    <Grid container direction="column" sx={{ my: 2 }}>
      <Grid item>
        <Typography fontSize="35px">
          {`${FirstName} ${LastName}`}
          <EditStudentInfoModal
            student={student}
            onSaveSuccess={() => onReload()}
            isParent={isParent}
          />
        </Typography>
      </Grid>
      <Grid item>
        <Typography>Cell Phone Number: {CellPhone}</Typography>
      </Grid>
      <Grid item>
        <Typography>Home Phone Number: {HomePhone}</Typography>
      </Grid>
      <Grid item>
        <Typography>Email: {Email}</Typography>
      </Grid>
      <Grid item>
        <Typography>
          Address: {Address} {City} {State} {ZipCode}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>City: {City}</Typography>
      </Grid>
      <Grid item>
        <Typography>State: {State}</Typography>
      </Grid>
      <Grid item>
        <Typography>Zip Code: {ZipCode}</Typography>
      </Grid>
      <Grid item>
        <Typography>Apartment Number: {ApartmentNumber}</Typography>
      </Grid>
      {!isParent && (
        <Grid item>
          <Typography>Date of Birth: {StudentDateOfBirth}</Typography>
        </Grid>
      )}
    </Grid>
  );
}
export function GoalsBox(props) {
  const { student, onReload } = props;

  const [allGoals, setAllGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchGoals = () => {
      setIsLoading(true);
      setHasError(false);

      // altGetStudentGoalsHandler uses callbacks
      // I have no clue why it didn't work with the regular one.
      altGetStudentGoalsHandler(student.id, (goals, error) => {
        if (error) {
          setHasError(true);
        } else {
          setAllGoals(goals.data);
          console.log('FINDME', goals.data);
        }
        setIsLoading(false);
      });
    };
    fetchGoals();
  }, [student.id]);
  if (isLoading) return <LayoutPreloader />;
  if (hasError) return <LayoutError />;

  return (
    <Box>
      <AddGoalModal student={student} />
      {allGoals.map((goalContent) => (
        <Goal goal={goalContent} key={goalContent[0]} />
      ))}
    </Box>
  );
}

StudentInfoBox.propTypes = {
  student: propTypes.func,
  onReload: propTypes.func,
  isParent: propTypes.bool,
};
StudentInfoBox.defaultProps = {
  student: undefined,
  onReload: undefined,
  isParent: false,
};

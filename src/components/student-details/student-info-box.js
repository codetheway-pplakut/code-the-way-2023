import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import dayjs from 'dayjs';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import EditStudentInfoModal from './edit-student-info-modal';
import Goal from './goal';
import { altGetStudentGoalsHandler } from './goalsHandler';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';
import { AddGoalModal } from './goal-modals';

export function StudentInfoBox(props) {
  const { student, onReload, isParent } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferredPhone, setPreferredPhone] = useState('');
  const [email, setEmail] = useState('');
  // Student-specific information:
  const [studentDateOfBirth, setStudentDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(''); // check if creating state var causes error
  const [zipCode, setZipCode] = useState('');

  // useEffect gets names again when the student is updated
  useEffect(() => {
    if (isParent) {
      setFirstName(student.parentFirstName);
      setLastName(student.parentLastName);
      setAddress(student.address);
      setApartmentNumber(student.parentApartmentNumber);
      setCity(student.parentCity);
      setState(student.parentState);
      setZipCode(student.parentZipCode);
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
      setPreferredPhone(student.studentCellPhone);
      setEmail(student.studentEmail);
    }
  }, [isParent, student]);

  return (
    <Grid container direction="column" spacing="2vh">
      <Grid item>
        {!isParent && (
          <Grid item>
            <Typography fontSize="2.5vw">
              {`${firstName} ${lastName}`}&#39;s Details{' '}
              <EditStudentInfoModal
                student={student}
                onSaveSuccess={() => onReload()}
                isParent={isParent}
              />
            </Typography>
            <Divider variant="middle" sx={{ borderBottomWidth: '2px' }} />
          </Grid>
        )}
      </Grid>
      <Grid item>
        {isParent && (
          <React.Fragment>
            <Grid item>
              <Divider variant="middle" sx={{ borderBottomWidth: '2px' }} />
              <Typography fontSize="30px">
                Parent Information{' '}
                <EditStudentInfoModal
                  student={student}
                  onSaveSuccess={() => onReload()}
                  isParent={isParent}
                />
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontSize="16px">
                Parent Name: {`${firstName} ${lastName}`}
              </Typography>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
      <Grid item>
        <Typography>Email: {email}</Typography>
      </Grid>
      <Grid item>
        <Typography>Preferred Phone Number: {preferredPhone}</Typography>
      </Grid>

      <Grid item>
        <Typography>
          Address: {address} {city} {state} {zipCode}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>Apartment Number: {apartmentNumber}</Typography>
      </Grid>
      {!isParent && (
        <Grid item>
          <Typography>
            Date of Birth: {dayjs(studentDateOfBirth).format('MMM DD, YYYY')}
          </Typography>
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

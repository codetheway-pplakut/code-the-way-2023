import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import dayjs from 'dayjs';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import EditStudentInfoModal from './edit-student-info-modal';
import Goal from './goals/goal';
import { altGetStudentGoalsHandler } from './goals/goalsHandler';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';
import { AddGoalModal } from './goals/goal-modals';
import { Career } from './careers/career';
import { getStudentCareersHandler } from './careers/careersHandler';
import { AddCareerModal } from './careers/career-modals';

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
      setPreferredPhone(student.parentCellPhone);
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

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);
    return Math.abs(age.getUTCFullYear() - 1970);
  };

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
          <Grid item>
            <Divider variant="middle" sx={{ borderBottomWidth: '2px' }} />
            <Typography fontSize="2vw">
              Parent Information{' '}
              <EditStudentInfoModal
                student={student}
                onSaveSuccess={() => onReload()}
                isParent={isParent}
              />
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid container xs={12} m="1vw">
        <Grid item xs={5}>
          {!isParent ? (
            <Typography>
              Date of Birth:{' '}
              <Typography color="#959595">
                {dayjs(studentDateOfBirth).format('MMM DD, YYYY')}
              </Typography>
              <Typography color="#959595">
                Age: {calculateAge(studentDateOfBirth)}
              </Typography>
            </Typography>
          ) : (
            <Typography fontSize="16px">
              Parent Name:
              <Typography color="#959595">{`${firstName} ${lastName}`}</Typography>
            </Typography>
          )}
        </Grid>
        <Grid item xs={7}>
          <Typography>Email:</Typography>
          <Typography color="#959595">{email}</Typography>
        </Grid>
      </Grid>

      <Grid container xs={12} m="1vw">
        <Grid item xs={5}>
          <Typography>Address:</Typography>
          <Typography color="#959595">
            {address}{' '}
            {apartmentNumber !== '' && apartmentNumber !== null && (
              <React.Fragment>Apt. {apartmentNumber}</React.Fragment>
            )}
          </Typography>
          <Typography color="#959595">
            {city}, {state} {zipCode}
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography>
            Preferred Phone Number:
            <Typography color="#959595">{preferredPhone}</Typography>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
export function GoalsBox(props) {
  const { student } = props;

  const [allGoals, setAllGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fetchGoals = () => {
    console.log('fetchGoals triggered');
    setIsLoading(true);
    setHasError(false);
    setAllGoals([]);

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

  useEffect(() => {
    fetchGoals();
  }, [student.id]);
  if (isLoading) return <LayoutPreloader />;
  if (hasError) return <LayoutError />;

  const renderGoal = ({ index }) => {
    const goalContent = allGoals[index];
    return (
      <Grid container>
        <Grid item xs={12}>
          <Goal
            sx={{ pt: '20px', maxWidth: '50%' }}
            goal={goalContent}
            key={goalContent.id}
            onSaveSuccess={() => fetchGoals()}
          />
        </Grid>
      </Grid>
    );
  };

  // FIXME Item size must change whenever the size of the goals themselves change.
  return (
    <Box>
      <Grid container>
        <Grid item container xs={12}>
          <Grid item xs={11}>
            <Typography fontSize="30px">
              {student.studentFirstName} {student.studentLastName}'s Goals
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <AddGoalModal
              student={student}
              onSaveSuccess={() => fetchGoals()}
            />
          </Grid>
        </Grid>
      </Grid>
      <List height={900} itemCount={allGoals.length} itemSize={250}>
        {renderGoal}
      </List>
    </Box>
  );
}
export function CareerBox(props) {
  const { student } = props;

  const [allCareers, setAllCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fetchCareer = async () => {
    console.log('fetchCareer triggered');
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await getStudentCareersHandler(student.id);
      const { data } = response;
      setAllCareers(data);
    } catch (error) {
      setHasError(true);
      console.log('error in CareersBox', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCareer();
  }, [student.id]);
  if (isLoading) return <LayoutPreloader />;
  if (hasError) return <LayoutError />;

  const renderCareer = ({ index }) => {
    const careerContent = allCareers[index];
    return (
      <Grid container>
        <Grid item xs={12}>
          <Career
            sx={{ pt: '20px', maxWidth: '50%' }}
            career={careerContent}
            key={careerContent.id}
            onSaveSuccess={() => fetchCareer()}
          />
        </Grid>
      </Grid>
    );
  };
  if (allCareers.length === 0)
    return (
      <Grid>
        <AddCareerModal student={student} onSaveSuccess={() => fetchCareer()} />
        <Typography>No careers</Typography>
      </Grid>
    );

  return (
    <Box>
      <AddCareerModal student={student} onSaveSuccess={() => fetchCareer()} />
      <List height={700} itemCount={allCareers.length} itemSize={250}>
        {renderCareer}
      </List>
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

CareerBox.propTypes = {
  student: propTypes.func,
  onReload: propTypes.func,
};
CareerBox.defaultProps = {
  student: undefined,
  onReload: undefined,
};

GoalsBox.propTypes = {
  student: propTypes.func,
  onReload: propTypes.func,
};
GoalsBox.defaultProps = {
  student: undefined,
  onReload: undefined,
};

import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import EditStudentInfoModal from './edit-student-info-modal';
import Goal from './goal';
import { getStudentGoalsHandler } from './goalsHandler';

export function StudentInfoBox(props) {
  const { student, onReload, isParent } = props;

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [CellPhone, setCellPhone] = useState('');
  const [Email, setEmail] = useState('');

  // useEffect gets names again when the student is updated
  useEffect(() => {
    if (isParent) {
      setFirstName(student.parentFirstName);
      setLastName(student.parentLastName);
      setCellPhone(student.parentCellPhone);
      setEmail(student.parentEmail);
    } else {
      setFirstName(student.studentFirstName);
      setLastName(student.studentLastName);
      setCellPhone(student.studentCellPhone);
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
        <Typography>Cell: {CellPhone}</Typography>
      </Grid>
      <Grid item>
        <Typography>Email: {Email}</Typography>
      </Grid>
    </Grid>
  );
}
export function GoalsBox(props) {
  const { student, onReload } = props;

  const [allGoals, setAllGoals] = useState([]);
  const TESTGOALS = [
    [
      'Test Goal 1',
      '2023-07-04T18:36:01.681Z',
      'SL',
      '2023-07-04T18:36:01.681Z',
      'No',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    ],
    [
      'Test Goal 2',
      '2023-07-04T18:36:01.681Z',
      'SL',
      '2023-07-04T18:36:01.681Z',
      'No',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  ];

  useEffect(() => {
    // PENDING: once API changes are made, setAllGoals(student.goals) should be sufficient
    setAllGoals(getStudentGoalsHandler(student.id));
    console.log('FINDME', allGoals);
  }, []);

  return allGoals.map((goalContent, index) => (
    <Goal goal={goalContent} key={index.id} />
  ));
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

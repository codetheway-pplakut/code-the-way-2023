import * as React from 'react';
import Grid from '@mui/material/Grid';
import propTypes from 'prop-types';
import {
  Box,
  MenuItem,
  Tab,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { CareerBox, GoalsBox, StudentInfoBox } from './student-info-display';
import { LayoutBackButton } from '../layout/layout-back-button/layout-back-button';
import { getStudentCommunicationsHandler } from './communications/communicationsHandler';
import { SearchBar } from '../table-layout/search';
import AddCommunicationsModal from './communications/add-communications-modal';
import CommunicationBox from './communications/communication-box';

/**
 * StudentDetails (student-details-page.js) is the framework for what the student details page will look like.
 * It displays student info boxes (student-info-display.js) and communications.
 */
export default function StudentDetails(props) {
  const [tabValue, setTabValue] = React.useState(0);
  const [communications, setCommunications] = React.useState({});
  const [rows, setRows] = React.useState({});

  const { student, onReload } = props;
  const studentID = student.id;

  const requestCommunication = async (id) => {
    if (id === undefined) return;
    const response = await getStudentCommunicationsHandler(id);
    const { data } = response;
    setCommunications(data);
    setRows(data);
  };

  React.useEffect(() => {
    requestCommunication(studentID);
  }, [studentID]);

  const requestSearch = (searchedVal) => {
    const lowerFilterInput = String(searchedVal).toLowerCase();
    const filteredRows = communications.filter((row) => {
      return ['topic', 'coachName'].some((key) => {
        const value = row[key];
        const lowerValue = String(value).toLowerCase();
        return lowerValue.includes(lowerFilterInput);
      });
    });
    setRows(filteredRows);
  };

  const visibleRows = React.useMemo(() => Object.values(rows), [rows]);

  const handleTabChange = React.useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const boxStyle = React.useMemo(
    () => ({
      bgcolor: '#ffffff',
      minWidth: '100%',
      color: '#000000',
      position: 'relative',
      minHeight: '70vh',
      borderRadius: '10px',
      boxShadow: '0 px 5px rgba(0, 0, 0, 0.2)',
    }),
    []
  );

  const tabStyle = React.useMemo(
    () => ({
      bgcolor: '#72777e',
      color: '#ffffff',
      position: 'relative',
      display: 'flex',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      minWidth: '10vw',
      mx: '10px',
      '&.Mui-selected': {
        color: '#0000000',
        bgcolor: '#ffffff',
      },
    }),
    []
  );

  return (
    <React.Fragment>
      <LayoutBackButton />

      <Grid container direction="row" sx={{ mt: '25px', px: '1vw', pl: '2vw' }}>
        <Grid item container xs={6} direction="column" alignItems="center">
          <Grid item position="relative">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}
            >
              <Tab sx={tabStyle} value={0} label="Student Info" />
              <Tab sx={tabStyle} value={1} label="Goals" />
              <Tab sx={tabStyle} value={2} label="Careers " />
              <Tab sx={tabStyle} value={3} label="Interview Info" />
            </Tabs>
          </Grid>

          <Grid
            item
            justifyContent="center"
            position="relative"
            boxShadow={5}
            borderRadius="10px"
          >
            {' '}
            <Box sx={boxStyle} padding="4vh">
              {tabValue === 0 && (
                <Grid width="42vw">
                  <StudentInfoBox
                    student={student}
                    onReload={() => onReload()}
                  />
                  <StudentInfoBox
                    student={student}
                    onReload={() => onReload()}
                    isParent
                  />
                </Grid>
              )}

              {tabValue === 1 && (
                <Grid width="42vw">
                  <GoalsBox student={student} onReload={() => onReload()} />
                </Grid>
              )}

              {tabValue === 2 && (
                <Grid width="42vw">
                  <CareerBox student={student} onReload={() => onReload()} />
                </Grid>
              )}

              {tabValue === 3 && (
                <Grid width="42vw">
                  <Box> Placeholder </Box>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid item container xs={6} direction="column">
          <Grid item container position="relative">
            <Grid item container direction="row">
              <Grid item xs={6} pl="2vw">
                <Typography fontSize={35}>Communication Log</Typography>
              </Grid>
              <Grid item xs={6}>
                <Toolbar>
                  <Grid item alignItems="flex-front" xs={8}>
                    <SearchBar requestSearch={requestSearch} />
                  </Grid>
                  <Grid item alignItems="flex-front">
                    <Box sx={{ mb: 2.5 }}>
                      <AddCommunicationsModal
                        student={student}
                        onSaveSuccess={() => requestCommunication(studentID)}
                      />
                    </Box>
                  </Grid>
                </Toolbar>
              </Grid>
            </Grid>
          </Grid>
          <Grid item position="relative">
            <Box
              sx={{
                maxHeight: '70vh',
                overflowY: 'auto',
                pl: '2vw',
                width: '45vw',
              }}
            >
              {visibleRows && visibleRows.length > 0 ? (
                visibleRows.map((row) => (
                  <CommunicationBox
                    key={row.communicationId}
                    coachName={row.coachName}
                    topic={row.topic}
                    description={row.description}
                    created={row.created}
                  />
                ))
              ) : (
                <Typography>No communications found</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

StudentDetails.propTypes = {
  student: propTypes.object,
  onReload: propTypes.func,
};
StudentDetails.defaultProps = {
  student: undefined,
  onReload: undefined,
};

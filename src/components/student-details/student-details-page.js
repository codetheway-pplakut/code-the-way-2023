import * as React from 'react';
import Grid from '@mui/material/Grid';
import propTypes from 'prop-types';
import { Box, MenuItem, Tab, TextField, Toolbar } from '@mui/material';
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
  // const [topic, setTopic] = React.useState('');

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
      return ['description'].some((key) => {
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
      bgcolor: '#dddddd',
      minWidth: '100%',
      color: '#000000',
      position: 'relative',
      minHeight: '70vh',
      borderRadius: '10px',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
    }),
    []
  );

  const tabStyle = React.useMemo(
    () => ({
      bgcolor: '#3E4C61',
      color: '#ffffff',
      position: 'relative',
      display: 'flex',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      minWidth: '10vw',
      margin: '0 10px',
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

      <Grid
        container
        direction="row"
        display="flex"
        sx={{ flexWrap: 'nowrap', mt: '50px' }}
      >
        <Grid item xs={6}>
          <Grid container justifyContent="center" pl="2vw">
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

          {/* <DynamicTabs
          tabNames={['Student Info', 'Goals and Careers', 'Interview Info']}
          tabValue={tabValue}
          handleTabChange={setTabValue}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
        /> */}

          <Grid item justifyContent="center" pl="2vw">
            <Box sx={boxStyle} padding="4vh">
              {tabValue === 0 && (
                <Grid>
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
                <GoalsBox student={student} onReload={() => onReload()} />
              )}

              {tabValue === 2 && (
                <CareerBox student={student} onReload={() => onReload()} />
              )}

              {tabValue === 3 && (
                <Box> Placeholder </Box>
                // TO BE DEPRECATED
                // Should be part of its own component

                // <React.Fragment>
                //   <h1>Interviews</h1>
                //   <Grid>
                //     {(interviews === null ||
                //       interviews === undefined ||
                //       interviews === {}) && <h6>No Interviews</h6>}
                //     {interviews !== null &&
                //       interviews !== undefined &&
                //       [interviews].map((interview) => {
                //         return (
                //           <h6 key={interview.id}>
                //             Interview: {interview.goalSet}
                //           </h6>
                //         );
                //       })}
                //   </Grid>
                // </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Toolbar>
            <Grid item alignItems="flex-front" sx={{ pl: '100%' }}>
              <SearchBar requestSearch={requestSearch} />
            </Grid>
            <Grid item alignItems="flex-front">
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <AddCommunicationsModal student={student} />
              </Box>
            </Grid>
          </Toolbar>
          {/* <Grid item alignItems="flex-end" sx={{ pl: '510%' }}>
            <TextField
              label="Topic"
              select
              value={topic}
              onChange={(event) => {
                setTopic(event.target.value);
              }}
            >
              <MenuItem value="One-on-ne coaching session">
                One-on-One Coaching Session
              </MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Phone call">Phone Call</MenuItem>
              <MenuItem value="Text message">Text Message</MenuItem>
            </TextField>
          </Grid> */}

          <Grid item sx={{ ml: '10%' }}>
            {console.log('visibleRows', visibleRows)}
            {visibleRows.map((row) => {
              return (
                <CommunicationBox
                  key={row.communicationId}
                  coach={row.coachId}
                  topic={row.topic}
                  notes={row.description}
                  date={row.created}
                />
              );
            })}
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

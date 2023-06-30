import * as React from 'react';
import Grid from '@mui/material/Grid';
import propTypes from 'prop-types';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Toolbar,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import AddIcon from '@mui/icons-material/Add';
import { GenericModal } from '../shared/generic-modal';
import InfoBox from './info-box';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { CommunicationLog } from './communication-log';
import { StudentInfoBox } from './student-info-box';

export default function StudentDetails(props) {
  const { student, onReload } = props;
  const [value, setValue] = React.useState(0);
  const [sel, setSel] = React.useState('');
  console.log('coming from student-details', onReload);
  const handleChange = React.useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const handleSel = React.useCallback((event) => {
    setSel(event.target.value);
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

  const iconStyle = React.useMemo(
    () => ({
      bgcolor: '#3E4C61',
      color: '#ffffff',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 40,
      minHeight: 40,
      borderRadius: '5px',
    }),
    []
  );

  const labelArray = [
    ['Name', 'Phone Number', 'Email'],
    ['Name', 'Phone Number', 'Email'],
    ['Financial Assistance'],
  ];

  const headerArray = [
    'Student Information',
    'Parent Information',
    'Household Information',
  ];

  const contentArray = [
    ['John Doe', '(262) 555-7535', 'john@gmail.com'],
    ['Jenny', '(414) 555-5309', 'jenny@gmail.com'],
    ['W-2'],
  ];

  return (
    <Grid
      container
      direction="row"
      display="flex"
      sx={{ flexWrap: 'nowrap', mt: '50px' }}
    >
      <Grid item xs={6} direction="row">
        <Grid container justifyContent="center">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            <Tab sx={tabStyle} value={0} label="Student Info" />
            <Tab sx={tabStyle} value={1} label="Goals and Careers" />
            <Tab sx={tabStyle} value={2} label="Interview Info" />
          </Tabs>
        </Grid>

        <Grid item justifyContent="center">
          <Box sx={boxStyle} padding="4vh">
            {value === 0 && (
              <Grid>
                <StudentInfoBox student={student} onReload={() => onReload()} />
                <StudentInfoBox
                  student={student}
                  onReload={() => onReload()}
                  isParent
                />
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid container xs={1}>
        <Grid item alignItems="flex-end" sx={{ pl: '510%' }}>
          <GenericModal
            modalHeadingTitle="Add Communication"
            actionButtonTitle="Add"
            cancelButtonTitle="Cancel"
            openButtonIcon={<AddIcon sx={iconStyle} />}
          >
            {/* TODO: Make Coach and Topic Dropdowns, Make Notes a large Textfield */}
            <Grid container direction="column">
              <Grid item sx={{ py: 3 }}>
                <TextFieldWithErrorMessage label="Coach" />
              </Grid>
              <Grid item sx={{ py: 3 }}>
                <TextFieldWithErrorMessage label="Topic" />
              </Grid>
              <Grid item sx={{ py: 3 }}>
                <TextFieldWithErrorMessage label="Notes" />
              </Grid>
            </Grid>
          </GenericModal>
        </Grid>

        <Grid item sx={{ ml: '10%' }}>
          <CommunicationLog
            data={[
              [0, '01/24/2023', 'John', 'Intro', 'We Had Fun'],
              [
                1,
                '01/24/2023',
                'John',
                'Consulation 1',
                'We talked about schools',
              ],
              [
                2,
                '01/25/2023',
                'John',
                'Consulation 2',
                'They said they liked UW Madison',
              ],
              [
                3,
                '01/26/2023',
                'John',
                'Consulation 3',
                'They said they are having trouble with Calculus',
              ],
              [
                4,
                '01/27/2023',
                'John',
                'Consulation 4',
                'They are deciding wether to pursue medicine or engineering',
              ],
              [
                5,
                '01/28/2023',
                'John',
                'Consulation 5',
                'They are thinking of doing extracurricular activities',
              ],
              [
                6,
                '01/29/2023',
                'John',
                'Career Talk 1',
                'We are talking about their careers',
              ],
              [
                7,
                '01/30/2023',
                'John',
                'Goal Setting 1',
                'We are talking about their goals',
              ],
              [
                8,
                '01/31/2023',
                'John',
                'Career Interest Talk',
                'We Had a Fun time discussing different career options',
              ],
              [
                9,
                '02/01/2023',
                'John',
                'Scholarships',
                'We discussed Scholarships',
              ],
              [
                10,
                '02/03/2023',
                'John',
                'Conclusion',
                'This was our last meeting',
              ],
            ]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

StudentDetails.propTypes = {
  student: propTypes.func,
  onReload: propTypes.func,
};
StudentDetails.defaultProps = {
  student: undefined,
  onReload: undefined,
};

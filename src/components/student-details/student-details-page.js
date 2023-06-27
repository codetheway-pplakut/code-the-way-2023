import * as React from 'react';
import Grid from '@mui/material/Grid';
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
import GenericModal from '../coaches/modal-component';
import InfoBox from './info-box';
import { TextFieldWithErrorMessage } from '../coaches/text-field-with-error-message';
import { CommunicationLog } from './communication-log';

export default function StudentDetails() {
  const [value, setValue] = React.useState(0);
  const [sel, setSel] = React.useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSel = (event) => {
    setSel(event.target.value);
  };
  // TODO Add handlers for submitting and cancelling

  const boxStyle = {
    bgcolor: '#dddddd',
    minWidth: '100%',
    color: '#000000',
    position: 'relative',
    minHeight: '70vh',
    borderRadius: '10px',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
  };

  const tabStyle = {
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
  };
  const iconStyle = {
    bgcolor: '#3E4C61',
    color: '#ffffff',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
    borderRadius: '5px',
  };

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
              <InfoBox
                headers={headerArray}
                content={contentArray}
                labels={labelArray}
                modal={headerArray.map((header, headerIndex) => (
                  <GenericModal
                    key={headerIndex.id}
                    modalHeadingTitle={`Edit ${header}`}
                    openButtonIcon={<EditIcon sx={iconStyle} />}
                    actionButtonTitle="Submit"
                    cancelButtonTitle="Cancel"
                  >
                    <Grid container direction="column">
                      {labelArray.map(
                        (label, labelIndex) =>
                          labelArray[headerIndex][labelIndex] && (
                            <Grid item key={labelIndex.id} sx={{ py: 3 }}>
                              <TextFieldWithErrorMessage
                                label={labelArray[headerIndex][labelIndex]}
                              />
                            </Grid>
                          )
                      )}
                    </Grid>
                  </GenericModal>
                ))}
              />
            )}
            {value === 1 && (
              <InfoBox
                headers={['Goals', 'Careers']}
                modal={[
                  <GenericModal
                    key="1"
                    modalHeadingTitle="Add Goal"
                    openButtonIcon={<AddIcon sx={iconStyle} />}
                    actionButtonTitle="Add"
                    cancelButtonTitle="Cancel"
                  >
                    <Grid Container direction="column">
                      <Grid item sx={{ py: 3 }}>
                        <TextFieldWithErrorMessage label="Goal" />
                      </Grid>
                      {/* TODO Make dropdown a component: this is too big */}
                      <Grid item alignItems="center" sx={{ py: 3, px: 12 }}>
                        <FormControl sx={{ minWidth: '200px', mx: 5 }}>
                          <InputLabel id="sel">sel</InputLabel>
                          <Select
                            labelid="select"
                            id="select"
                            value={sel}
                            label="SEL"
                            onChange={handleSel}
                          >
                            <MenuItem value="Social">Social</MenuItem>
                            <MenuItem value="Emotional">Emotional</MenuItem>
                            <MenuItem value="Learning">Learning</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item sx={{ py: 3 }}>
                        <TextFieldWithErrorMessage label="Was it Accomplished" />
                      </Grid>
                      <Grid item sx={{ py: 3 }}>
                        <TextFieldWithErrorMessage label="Explanation" />
                      </Grid>
                    </Grid>
                  </GenericModal>,
                  <GenericModal
                    key="2"
                    modalHeadingTitle="Add Career"
                    openButtonIcon={<AddIcon sx={iconStyle} />}
                    actionButtonTitle="Add"
                    cancelButtonTitle="Cancel"
                  >
                    {/* TODO: items 1 and 4 need to be bool, item 2 needs to be dropdown */}
                    <Grid Container direction="column">
                      <Grid item sx={{ py: 3 }}>
                        <TextFieldWithErrorMessage label="College Bound?" />
                      </Grid>
                      <Grid item sx={{ py: 3 }}>
                        <TextFieldWithErrorMessage label="Career Cluster" />
                      </Grid>
                      <Grid item sx={{ py: 3 }}>
                        <TextFieldWithErrorMessage label="Career Name" />
                      </Grid>
                      <Grid item sx={{ py: 3 }}>
                        <TextFieldWithErrorMessage label="Technical College Bound?" />
                      </Grid>
                    </Grid>
                  </GenericModal>,
                ]}
                content={[
                  ['Get a job'],
                  ['Aspiring software developer', 'Job 2'],
                ]}
                labels={[['Goal 1'], ['Career 1', 'Career 2']]}
              />
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
            <Grid Container direction="column">
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

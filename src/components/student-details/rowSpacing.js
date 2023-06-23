import * as React from 'react';
import Grid from '@mui/material/Grid';
import {
  Box,
  IconButton,
  Paper,
  Tab,
  Toolbar,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import AddIcon from '@mui/icons-material/Add';
import GenericModal from '../coaches/modal-component';
import InfoBox from './info-box';
import CommunicationBox from './communication-box';

export default function RowAndColumnSpacing() {
  const [value, setValue] = React.useState('one');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const boxStyle = {
    bgcolor: '#ffffff',
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
    minWidth: '13vw',
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

  return (
    <Grid container>
      <Grid container width="50%">
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
            <Tab sx={tabStyle} value={3} label="Interview Info" />
          </Tabs>
        </Grid>
        <Grid container justifyContent="center">
          <Box sx={boxStyle} padding="4vh">
            {value === 0 && (
              <InfoBox
                headers={[
                  'Student Information',
                  'Parent Information',
                  'Household Information',
                ]}
                modal={[
                  <GenericModal
                    key="1"
                    modalHeadingTitle="Edit Parent Info"
                    openButtonIcon={<EditIcon sx={iconStyle} />}
                  />,
                  <GenericModal
                    key="2"
                    modalHeadingTitle="Edit Household Info"
                    openButtonIcon={<EditIcon sx={iconStyle} />}
                  />,
                ]}
                content={[
                  ['John Doe', '(262) 555-7535', 'john@gmail.com'],
                  ['Jenny', '(414) 555-5309', 'jenny@gmail.com'],
                  ['W-2'],
                ]}
                labels={[
                  ['Name', 'Phone Number', 'Email'],
                  ['Name', 'Phone Number', 'Email'],
                  ['Financial Assistance'],
                ]}
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
                  />,
                  <GenericModal
                    key="2"
                    modalHeadingTitle="Add Career"
                    openButtonIcon={<AddIcon sx={iconStyle} />}
                  />,
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

      <Grid
        item
        container
        alignItems="center"
        width="50%"
        justifyContent="space-between"
      />
    </Grid>
  );
}

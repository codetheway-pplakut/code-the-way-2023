import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, IconButton, Paper, Tab, Toolbar } from '@mui/material';
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

  const style = {
    // flexShrink: 1,
    // display: 'inline-flex',
    // overflow: 'auto',
  };
  const tabStyle = {
    bgcolor: '#004cbb',
    color: '#ffffff',
    position: 'relative',
    ml: '2%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // minWidth: 150,
    // '&:hover': {
    //   bgcolor: '#ffb570',
    //   opacity: 1,
    // },
    '&.Mui-selected': {
      color: '#ffffff',
      bgcolor: '#ff7c00',
    },
  };
  const iconStyle = {
    bgcolor: '#004cbb',
    color: '#ffffff',
    position: 'relative',
    ml: '2%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
  };
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item container direction="row" alignItems="center" minWidth="100%">
        <Grid item width="50%" alignItems="center" mr="5%">
          <Grid
            container
            direction="row"
            sx={style}
            alignItems="center"
            ml="10px"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                width: '700px',
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}
            >
              <Tab sx={tabStyle} value="one" label="Contact Info" />

              <Tab
                sx={tabStyle}
                value="two"
                label="Goals and Careers"
                alignItems="center"
              />

              <Tab
                sx={tabStyle}
                value="three"
                label="Interview Info"
                alignItems="center"
              />
            </Tabs>
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          width="45%"
          sx={style}
          justifyContent="space-between"
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item sx={tabStyle} mr="20%">
              <Tab
                value="four"
                label="Communication Log"
                alignItems="center"
                disabled
              />
            </Grid>
            <Grid item>
              <GenericModal openButtonIcon={<AddIcon sx={iconStyle} />} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="row">
        {value === 'one' && (
          <InfoBox
            headers={['Student', 'Parent']}
            modal={[
              <GenericModal
                key="1"
                modalHeadingTitle="Edit Student"
                openButtonIcon={<EditIcon sx={iconStyle} />}
              />,
              <GenericModal
                key="2"
                modalHeadingTitle="Edit Parent"
                openButtonIcon={<EditIcon sx={iconStyle} />}
              />,
            ]}
            content={[['frank'], ['jenny', '867-5309', 'jenny@gmail.com']]}
            labels={[['Name'], ['Name', 'Phone Number', 'Email']]}
          />
        )}
        {value === 'two' && (
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
              ['Finish this website'],
              ['Aspiring software developer', 'API bankruptor'],
            ]}
            labels={[['Goal 1'], ['Career 1', 'Career 2']]}
          />
        )}
        {/* XXX: doesn't work on all viewport sizes, just most */}
        <Grid
          container
          item
          xs={2}
          sx={{
            position: 'relative',
            display: 'grid',
            width: '100vw',
            mr: '0.1%',
            ml: '0.1%',

            maxWidth: '47%',
          }}
        >
          <Grid item>
            <CommunicationBox
              date="01/24/2023"
              coach="John"
              topic="Intro"
              notes="Today TodayTodayTodayTodayToday Today   Today  Today  Today  Today  Today  Today  Today  Today  Today  Today  Today  Today  Today  Today  Today  Today  Today  Toy"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

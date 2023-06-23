import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Tab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import AddIcon from '@mui/icons-material/Add';
import GenericModal from '../coaches/modal-component';
import InfoBox from './info-box';
import CommunicationBox from './communication-box';
import { CommunicationLog } from './communication-log';

export default function StudentDetails() {
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
              scrollButtons
              sx={{
                width: '50%',
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
              <GenericModal
                modalHeadingTitle="Add Communication"
                openButtonIcon={<AddIcon sx={iconStyle} />}
              />
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

        {value === 'three' && <InfoBox />}
        {/* XXX: doesn't work on all viewport sizes, just most */}
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
  );
}

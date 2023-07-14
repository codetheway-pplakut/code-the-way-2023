import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCoachByIdHandler } from '../../coaches/coachHandlers';
import { AspirationsCard, AspirationsCardHeader } from '../aspirations-card';

export default function CommunicationBox(props) {
  const { date, coach, topic, notes } = props;
  const [coachName, setCoachName] = React.useState('');

  console.log(date);

  const formattedDate = Date(Date.parse(date)).toString();

  const getCoach = async (id) => {
    if (id === undefined) return;
    const response = await getCoachByIdHandler(id);
    const { data } = response;
    setCoachName(data);
  };

  useEffect(() => {
    getCoach(coach);
  }, [coach]);

  const coachFullName = `${coachName.coachFirstName} ${coachName.coachLastName}`;

  const boxStyle = {
    position: 'relative',
    bgcolor: '#dadada',
    color: '#000000',
    borderColor: '#000000',
    ml: '2%',
    // height: 'auto',
    width: '43.3vw',
    minHeight: '250px',
    // flexShrink: 1,
    display: 'flex',
    // gridColumn: '1 / -1',
  };
  const textStyle = {
    mt: '13px',
    ml: '28px',
    fontSize: '1.2vw',
  };
  const headerStyle = {
    mt: '0.1px',

    ml: '28px',
    fontSize: '2.2vw',
    position: 'relative',
  };
  const noteStyle = {
    mb: '10px',
    mx: '30px',
    fontSize: '0.9vw',
  };

  return (
    <AspirationsCard>
      <AspirationsCardHeader header={topic}>
        <Grid item xs={4}>
          <Typography>{`Coach Name: ${coachFullName}`}</Typography>
        </Grid>
        <Grid item xs={1}>
          {/* <EditCareerModal career={career} onSaveSuccess={onSaveSuccess} /> */}
        </Grid>
        <Grid item xs={1}>
          {/* <DeleteCareerModal career={career} onSaveSuccess={onSaveSuccess} /> */}
        </Grid>
      </AspirationsCardHeader>
      <Grid
        container
        alignItems="center"
        sx={{
          px: '2vw',
          py: '2vh',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
        }}
      >
        <Grid item xs={6}>
          <Typography>Description: {notes}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Date: {formattedDate}</Typography>
        </Grid>
      </Grid>
    </AspirationsCard>

    // <Box sx={boxStyle}>
    //   <Grid
    //     container
    //     direction="row"
    //     sx={{
    //       border: 2,
    //       borderTopLeftRadius: '5px',
    //       borderTopRightRadius: '5px',
    //     }}
    //   >
    //     <Grid item xs={5}>
    //       <Typography sx={textStyle}> Date Created: {formattedDate}</Typography>
    //     </Grid>
    //     <Grid item xs={4}>
    //       <Typography sx={textStyle}>Coach: {coachFullName} </Typography>
    //     </Grid>
    //     <Grid item xs={9}>
    //       <Typography sx={headerStyle}>{topic}</Typography>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Typography sx={noteStyle}>{notes}</Typography>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
}

CommunicationBox.defaultProps = {
  date: null,
  coach: null,
  topic: null,
  notes: null,
};

CommunicationBox.propTypes = {
  date: PropTypes.string,
  coach: PropTypes.string,
  topic: PropTypes.string,
  notes: PropTypes.string,
};

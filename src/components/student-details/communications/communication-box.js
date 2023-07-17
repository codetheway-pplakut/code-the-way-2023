import { Grid, Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { getCoachByIdHandler } from '../../coaches/coachHandlers';
import {
  AspirationsCard,
  AspirationsCardHeader,
  AspirationsCardFooter,
} from '../aspirations-card';

export default function CommunicationBox(props) {
  const { date, coach, topic, notes } = props;
  const [coachName, setCoachName] = React.useState('');

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

  return (
    <Box py="3px">
      <AspirationsCard>
        <AspirationsCardHeader header={topic} />
        <Grid container direction="row" />
        <Grid
          container
          sx={{
            px: '2vw',
            py: '2vh',
            minHeight: '10vh',
          }}
        >
          <Typography>{notes}</Typography>
        </Grid>
        <AspirationsCardFooter>
          <Grid container>
            <Grid item xs={6}>
              <Typography>{`Coach Name: ${coachFullName}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Date: {dayjs(date).format('MMM DD, YYYY')}
              </Typography>
            </Grid>
          </Grid>
        </AspirationsCardFooter>
      </AspirationsCard>
    </Box>
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

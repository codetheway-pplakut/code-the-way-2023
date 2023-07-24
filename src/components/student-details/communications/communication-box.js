import { Grid, Typography, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from 'dayjs';
import {
  AspirationsCard,
  AspirationsCardHeader,
  AspirationsCardFooter,
} from '../aspirations-card';

export default function CommunicationBox(props) {
  const { coachName, topic, description, created } = props;
  const [showMore, setShowMore] = useState(true);

  // determines if communication description is too long and needs show more
  const shouldShowMore = description.length > 100;

  const handleChange = () => {
    setShowMore(!showMore);
  };

  return (
    <Box py="3px">
      <AspirationsCard>
        <AspirationsCardHeader>
          <Grid container>
            <Grid item xs={5}>
              <Typography fontSize={17} fontWeight="fontWeightMedium">
                {topic}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                fontSize={17}
                fontWeight="fontWeightMedium"
              >{`Coach: ${coachName}`}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontSize={17} fontWeight="fontWeightMedium">
                {dayjs(created).format('MMM DD, YYYY')}
              </Typography>
            </Grid>
          </Grid>
        </AspirationsCardHeader>
        <Grid container direction="row" />
        <Grid
          container
          sx={{
            px: '2vw',
            py: '2vh',
            minHeight: '10vh',
          }}
        >
          {shouldShowMore ? (
            <React.Fragment>
              <Typography noWrap={showMore} paragraph>
                {showMore ? description.slice(0, 100) : description}
              </Typography>
              <Button
                fullWidth
                onClick={handleChange}
                startIcon={
                  showMore ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />
                }
              />
            </React.Fragment>
          ) : (
            <Typography noWrap>{description}</Typography>
          )}
        </Grid>
      </AspirationsCard>
    </Box>
  );
}

CommunicationBox.defaultProps = {
  created: null,
  coachName: null,
  topic: null,
  description: null,
};

CommunicationBox.propTypes = {
  created: PropTypes.string,
  coachName: PropTypes.string,
  topic: PropTypes.string,
  description: PropTypes.string,
};

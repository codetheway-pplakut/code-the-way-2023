import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes, { array, instanceOf } from 'prop-types';
import GenericModal from '../coaches/modal-component';

/**
 * PROPS
 * headers: Array of strings
 * modal: Array of generic modals
 * content: 2D array
 * labels: 2D array of strings
 *
 * RETURNS
 * A box of info
 * image of InfoBox with default props: https://codetheway2022.slack.com/archives/C035YN121GW/p1687366194249229
 */
export default function InfoBox(props) {
  const { headers, modal, content, labels } = props;
  const boxStyle = {
    bgcolor: '#004cbb',
    color: '#ffffff',
    minHeight: '100%',
    minWidth: '55%',
    mx: '10px',
  };

  const textStyle = {
    mx: '5px',
    fontSize: '1.2vw',
  };

  const headerStyle = {
    mx: '5px',
    fontSize: '2.2vw',
  };

  return (
    <Box sx={boxStyle}>
      <Grid container direction="column">
        {headers.map((header, headerIndex) => (
          <Grid container key={headerIndex.id}>
            <Grid container item direction="row">
              <Typography sx={headerStyle}> {header} </Typography>
              {modal[headerIndex]}
            </Grid>
            {content[headerIndex].map((contents, contentIndex) => (
              <Grid container item my="2%" key={contentIndex.id}>
                <Typography sx={textStyle}>
                  {' '}
                  {labels[headerIndex][contentIndex]}: {contents}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

InfoBox.defaultProps = {
  headers: ['Student', 'Parent 1', 'Parent 2'],
  modal: [],
  content: [
    ['John Doe', 'xxx-xxxx', 'placeholder@gmail.com'],
    ['Jane Doe', 'xxx-xxxx', 'placeholder@gmail.com'],
    ['John Doe Sr.', 'xxx-xxxx', 'placeholder@gmail.com'],
  ],
  labels: [
    ['Name', 'Phone Number', 'Email'],
    ['Name', 'Phone Number', 'Email'],
    ['Name', 'Phone Number', 'Email'],
  ],
};
InfoBox.propTypes = {
  headers: PropTypes.array,
  modal: PropTypes.arrayOf(instanceOf(GenericModal)),
  content: PropTypes.arrayOf(array),
  labels: PropTypes.arrayOf(array),
};

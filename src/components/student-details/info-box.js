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
    bgcolor: '#ffffff',
    color: '#000000',
    position: 'relative',
    minHeight: '70vh',
    borderRadius: '10px',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
  };

  const textStyle = {};

  const headerStyle = {};

  return (
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

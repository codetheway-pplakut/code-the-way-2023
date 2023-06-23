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
  const { name, headers, modal, content, labels } = props;

  const textStyle = {};

  const headerStyle = {};

  return (
    <Grid container direction="column">
      <Typography fontSize="35px">{name}&#39;s Student Details</Typography>
      {headers.map((header, headerIndex) => (
        <Grid container key={headerIndex.id}>
          <Grid container item direction="row">
            <Typography sx={headerStyle} fontSize="35px">
              {header}
            </Typography>
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
  name: 'John Doe',
  headers: ['Student Info', 'Parent Info', 'Household Info'],
  modal: [],
  content: [],
  labels: [],
};
InfoBox.propTypes = {
  name: PropTypes.string,
  headers: PropTypes.array,
  modal: PropTypes.arrayOf(instanceOf(GenericModal)),
  content: PropTypes.arrayOf(array),
  labels: PropTypes.arrayOf(array),
};

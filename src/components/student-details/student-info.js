import * as React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import RowAndColumnSpacing from './rowSpacing';

export function StudentInfo(props) {
  const { name } = props;
  return (
    <div>
      <Typography variant="h2" mx="10px" mt="5px">
        {name}
      </Typography>
      <RowAndColumnSpacing />
    </div>
  );
}

StudentInfo.defaultProps = {
  name: 'No name given',
};

StudentInfo.propTypes = {
  name: PropTypes.string,
};

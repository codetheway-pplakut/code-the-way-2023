import { TextField } from '@mui/material';
import React from 'react';

export function QandABlock(props) {
  const { questionNum, questionString, answer } = props;

  return (
    <div>
      <h3>
        {questionNum + 1}: {questionString}
      </h3>
      <TextField fullWidth value={answer} label="Answer" />
    </div>
  );
}

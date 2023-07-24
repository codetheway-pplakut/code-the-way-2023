import { TextField } from '@mui/material';
import React from 'react';

export function QandABlock(props) {
  const { questionNum, questionString, answers, setAnswers } = props;
  const answer = answers[questionNum];

  const updateFieldChanged = () => (e) => {
    const newAnswers = [...answers];
    newAnswers[questionNum] = e.target.value;
    setAnswers(newAnswers);
  };

  return (
    <div>
      <h3>
        {questionNum + 1}: {questionString}
      </h3>
      <TextField
        fullWidth
        value={answer}
        label="Answer"
        onChange={updateFieldChanged()}
      />
    </div>
  );
}

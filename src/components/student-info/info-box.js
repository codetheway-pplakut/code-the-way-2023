import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import GenericModal from '../coaches/modal-component';

export default function InfoBox(props) {
  const { student, parent1, parent2 } = props;
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
    <Box sx={boxStyle}>
      <Grid container direction="column">
        <Grid container item direction="row">
          <Typography sx={headerStyle}> Student </Typography>
          <GenericModal buttonIcon={<EditIcon sx={iconStyle} />} />
        </Grid>
        <Grid item my="2%">
          <Typography sx={textStyle}>Name: {student[0]}</Typography>
          <Typography sx={textStyle}>Phone: {student[1]}</Typography>
          <Typography sx={textStyle}>Email: {student[2]}</Typography>
        </Grid>
        <Grid container item direction="row">
          <Typography sx={headerStyle}> Parent 1</Typography>
          <GenericModal buttonIcon={<EditIcon sx={iconStyle} />} />
        </Grid>
        <Grid item my="2%">
          <Typography sx={textStyle}>Name: {parent1[0]}</Typography>
          <Typography sx={textStyle}>Phone: {parent1[1]}</Typography>
          <Typography sx={textStyle}>Email: {parent1[2]}</Typography>
        </Grid>
        <Grid container item direction="row">
          <Typography sx={headerStyle}> Parent 2</Typography>
          <GenericModal buttonIcon={<EditIcon sx={iconStyle} />} />
        </Grid>
        <Grid item my="2%">
          <Typography sx={textStyle}>Name: {parent2[0]}</Typography>
          <Typography sx={textStyle}>Phone: {parent2[1]}</Typography>
          <Typography sx={textStyle}>Email: {parent2[2]}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

InfoBox.defaultProps = {
  student: ['John Doe', 'xxx-xxxx', 'placeholder@gmail.com'],
  parent1: ['Jane Doe', 'xxx-xxxx', 'placeholder@gmail.com'],
  parent2: ['John Doe Sr.', 'xxx-xxxx', 'placeholder@gmail.com'],
};

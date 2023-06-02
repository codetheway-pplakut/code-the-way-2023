import { Button } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export function LayoutBackButton() {
  const navigate = useNavigate();
  const onClick = () => navigate(-1);

  return (
    <Button
      onClick={onClick}
      size="small"
      startIcon={<ArrowBackIcon />}
      variant="outlined"
    >
      Back
    </Button>
  );
}

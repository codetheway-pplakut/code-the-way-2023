import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import ModalComponent from './modalComponent';

export function Coaches() {
  return (
    <div>
      <ModalComponent />
    </div>
  );
}

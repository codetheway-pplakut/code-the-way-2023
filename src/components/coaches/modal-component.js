import React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TwoButtonComponent from './two-button-component';

// Background of modal styling:
const backgroundStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 475,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
};

// Heading styling:
const headingStyle = {
  bgcolor: '#3E4C61',
  color: 'white',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  boxShadow: 4,
};

const headingText = {
  fontSize: 29,
};

// Footer styling
const footerStyle = {
  bgcolor: '#F4F4F4',
  color: 'white',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
};

// "X" icon styling:
const closeIconStyle = {
  color: '#C5C5C5',
  position: 'absolute',
  right: 8,
  top: 8,
};

export function ModalComponent(props) {
  const {
    modalHeadingTitle,
    modalMessage,
    actionButtonFunction,
    actionName,
    usingTwoButtonFormat,
  } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Archive Coach</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={backgroundStyle}>
          <Grid item sx={headingStyle} xs={12}>
            <Typography padding={2} align="center" sx={headingText}>
              {modalHeadingTitle}
            </Typography>
            <IconButton size="small" onClick={handleClose} sx={closeIconStyle}>
              <CloseIcon fontSize="large" sx={closeIconStyle} />
            </IconButton>
          </Grid>
          <Typography padding={5} align="center" fontSize={20}>
            {modalMessage}
          </Typography>
          {usingTwoButtonFormat && (
            <Grid item sx={footerStyle} xs={12}>
              <TwoButtonComponent
                actionName={actionName}
                handleClose={handleClose}
                actionButtonFunction={actionButtonFunction}
              />
            </Grid>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default ModalComponent;

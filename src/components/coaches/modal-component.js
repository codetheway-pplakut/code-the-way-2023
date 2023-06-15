import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import TwoButtonComponent from './two-button-component';

// Background of modal styling:
const backgroundStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
};

// Heading styling:
const headingStyle = {
  bgcolor: '#2E65B8',
  color: 'white',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  boxShadow: 4,
};
const headingText = {
  fontSize: 29,
  fontFamily: 'roboto',
};

// "X" icon styling:
const closeIconStyle = {
  color: '#9BB4DA',
  position: 'absolute',
  right: 8,
  top: 8,
};

export function ModalComponent(props) {
  const { modalHeadingTitle, modalMessage, actionName } = props;
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
          <Typography sx={{ mt: 2 }} padding={1} align="center" fontSize={20}>
            {modalMessage}
          </Typography>
          <TwoButtonComponent actionName={props.actionName} />
        </Box>
      </Modal>
    </div>
  );
}

ModalComponent.propTypes = {
  modalHeadingTitle: PropTypes.object.isRequired,
  modalMessage: PropTypes.object.isRequired,
  actionName: PropTypes.object.isRequired,
};

export default ModalComponent;

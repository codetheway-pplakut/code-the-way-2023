import React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  IconButton,
  Icon,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import ModalMessageComponent from './message-component';

import FieldComponent from './field-component';

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

// "X" icon styling:
const closeIconStyle = {
  color: '#C5C5C5',
  position: 'absolute',
  right: 8,
  top: 8,
};

export function GenericModal(props) {
  const { buttonIcon, openModal, modalHeadingTitle, modalMessage } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} startIcon={buttonIcon}>
        {openModal}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={backgroundStyle}>
          <Grid item sx={headingStyle}>
            <Typography padding={2} align="center" sx={headingText}>
              {modalHeadingTitle}
            </Typography>
            <IconButton size="small" onClick={handleClose} sx={closeIconStyle}>
              <CloseIcon fontSize="large" sx={closeIconStyle} />
            </IconButton>
          </Grid>
          <ModalMessageComponent modalMessage={modalMessage} />

          <FieldComponent handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
GenericModal.defaultProps = {
  buttonIcon: null,
  openModal: null,
};
GenericModal.propTypes = {
  buttonIcon: PropTypes.instanceOf(Icon),
  openModal: PropTypes.string,
  modalHeadingTitle: PropTypes.string.isRequired,
  modalMessage: PropTypes.string.isRequired,
};

export default GenericModal;

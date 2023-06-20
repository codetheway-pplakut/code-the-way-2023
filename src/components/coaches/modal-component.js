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
import PropTypes from 'prop-types';
import ModalMessageComponent from './modal-message';
import TwoButtonComponent from './two-button-component';
import FieldComponent from './field-component';
import { DropDownComponent } from './drop-down-component';

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
  const {
    openModal,
    modalHeadingTitle,
    modalMessage,
    actionButtonFunction,
    actionButtonTitle,
    cancelButtonTitle,
    usingTwoButtonFormat,
    usingFields,
    actionButtonColor,
    usingDropDown,
  } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{openModal}</Button>
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
          {usingFields && (
            <FieldComponent
              handleClose={handleClose}
              actionButtonFunction={actionButtonFunction}
              actionButtonTitle={actionButtonTitle}
              cancelButtonTitle={cancelButtonTitle}
              actionButtonColor={actionButtonColor}
            />
          )}
          {usingTwoButtonFormat && (
            <TwoButtonComponent
              handleClose={handleClose}
              actionButtonFunction={actionButtonFunction}
              actionButtonTitle={actionButtonTitle}
              cancelButtonTitle={cancelButtonTitle}
              actionButtonColor={actionButtonColor}
            />
          )}
          {usingDropDown && (
            <DropDownComponent
              handleClose={handleClose}
              actionButtonFunction={actionButtonFunction}
              actionButtonTitle={actionButtonTitle}
              cancelButtonTitle={cancelButtonTitle}
              actionButtonColor={actionButtonColor}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

GenericModal.propTypes = {
  openModal: PropTypes.string.isRequired,
  modalHeadingTitle: PropTypes.string.isRequired,
  modalMessage: PropTypes.string.isRequired,
  actionButtonFunction: PropTypes.element.isRequired,
  actionButtonTitle: PropTypes.string.isRequired,
  cancelButtonTitle: PropTypes.string.isRequired,
  usingTwoButtonFormat: PropTypes.bool.isRequired,
  usingFields: PropTypes.bool.isRequired,
  actionButtonColor: PropTypes.string.isRequired,
};

export default GenericModal;

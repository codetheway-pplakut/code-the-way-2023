import React, { Children } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import {
  backgroundStyle,
  headingStyle,
  headingText,
  closeIconStyle,
  footerStyle,
  buttonBackground,
  buttonText,
  buttonTheme,
} from './modal-styling';

export function GenericModal(props) {
  const {
    openModal,
    modalHeadingTitle,
    modalMessage,
    actionButtonFunction,
    actionButtonTitle,
    cancelButtonTitle,
    actionButtonColor,
    children,
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
          <Typography padding={5} align="center" fontSize={20}>
            {modalMessage}
          </Typography>

          {children}

          <Grid item sx={footerStyle} xs={12}>
            <Stack
              direction="row"
              spacing={0}
              justifyContent="right"
              padding={3}
            >
              <Button
                variant="text"
                onClick={handleClose}
                spacing={2}
                sx={buttonBackground}
                theme={buttonTheme}
                color="cancel"
              >
                <Typography style={buttonText}>{cancelButtonTitle}</Typography>
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  actionButtonFunction();
                  handleClose();
                }}
                sx={buttonBackground}
                theme={buttonTheme}
                color={actionButtonColor}
              >
                <Typography style={buttonText}>{actionButtonTitle}</Typography>
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

GenericModal.defaultProps = {
  openModal: null,
};

GenericModal.propTypes = {
  openModal: PropTypes.string,
  modalHeadingTitle: PropTypes.string.isRequired,
  modalMessage: PropTypes.string.isRequired,
  actionButtonFunction: PropTypes.element.isRequired,
  actionButtonTitle: PropTypes.string.isRequired,
  cancelButtonTitle: PropTypes.string.isRequired,
  actionButtonColor: PropTypes.string.isRequired,
};

export function AddCoachModal() {
  const addCoachAction = () => {
    console.log('here is where you connect to api');
  };

  return (
    <div>
      <GenericModal
        openModal="open1"
        modalHeadingTitle="Add a Coach"
        modalMessage="Fill out the fields below to add a coach."
        actionButtonTitle="Create"
        cancelButtonTitle="Cancel"
        actionButtonColor="submit"
        actionButtonFunction={addCoachAction}
      >
        <Grid container justifyContent="center">
          {' '}
          {/* Center the Grid container */}
          <Grid item xs={7}>
            <TextField
              fullWidth // Make the TextField component occupy the full width
              error
              helperText="Username cannot include a space."
            />
          </Grid>
        </Grid>
        <TextField fullWidth />{' '}
        {/* Make the TextField component occupy the full width */}
        <TextField />
      </GenericModal>
    </div>
  );
}

export function ArchiveCoachModal() {
  const archiveCoachAction = () => {
    console.log('here is where you connect to api');
  };

  return (
    <div>
      <GenericModal
        openModal="open"
        modalHeadingTitle="Archive Coach"
        modalMessage="Are you sure you want to archive this coach?"
        actionButtonTitle="Archive"
        cancelButtonTitle="Cancel"
        actionButtonColor="archive"
        actionButtonFunction={archiveCoachAction}
      />
    </div>
  );
}

export default GenericModal;

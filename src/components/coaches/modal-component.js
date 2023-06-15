import React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  IconButton,
  createTheme,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

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

// Button styling
const buttonTheme = createTheme({
  palette: {
    archive: {
      main: '#EC6E6E',
      contrastText: '#fff',
    },
    cancel: {
      main: '#6C6C6C',
      contrastText: '#868686',
    },
  },
});

const buttonText = {
  fontSize: '20px',
  fontFamily: 'roboto',
};

const buttonBackground = {
  minWidth: '130px',
  minHeight: '50px',
};

export function GenericModal(props) {
  const {
    openModal,
    modalHeadingTitle,
    modalMessage,
    actionButtonFunction,
    actionName,
    cancelButton,
    usingTwoButtonFormat,
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
          {usingTwoButtonFormat && (
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
                  <Typography style={buttonText}>{cancelButton}</Typography>
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    actionButtonFunction();
                    handleClose();
                  }}
                  sx={buttonBackground}
                  theme={buttonTheme}
                  color="archive"
                >
                  <Typography style={buttonText}>{actionName}</Typography>
                </Button>
              </Stack>
            </Grid>
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
  actionName: PropTypes.string.isRequired,
  cancelButton: PropTypes.string.isRequired,
  usingTwoButtonFormat: PropTypes.bool.isRequired,
};

export default GenericModal;

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
// const buttonTheme = createTheme({
//   palette: {
//     main: '#004CBB',
//   },
// });
const backgroundStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24, // don't 100% need
  borderRadius: '10px',
};
const headingStyle = {
  bgcolor: '#2E65B8',
  color: 'white',
  borderTopLeftRadius: 10, // shouldn't need?
  borderTopRightRadius: 10, // shouldn't need?
  boxShadow: 4, // don't 100% need
};
// const buttonBackground = {
//   minWidth: '120px',
//   minHeight: '40px',
// };
export default function BasicModal({ openModal, title, modalContent, close }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        variant="contained"
        // theme={buttonTheme}
        onClick={handleOpen}
        // sx={buttonBackground}
      >
        {openModal}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={backgroundStyle}>
          <Grid item sx={headingStyle} xs={12}>
            <Typography
              variant="h6"
              component="h2"
              align="center"
              padding="8px"
            >
              {title}
            </Typography>
          </Grid>
          <Box sx={{ mt: 5, bgcolor: '#FFFFFF' }}>{modalContent}</Box>
          <Stack
            direction="row"
            spacing={10}
            justifyContent="center"
            padding="20px"
          >
            <Button
              // theme={buttonTheme}
              variant="contained"
              onClick={handleClose}
              // display="flex"
            >
              {close}
            </Button>
            <Button
              // theme={buttonTheme}
              color="error"
              variant="contained"
              onClick={handleClose}
              // display="flex"
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
BasicModal.propTypes = {
  openModal: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  modalContent: PropTypes.element.isRequired,
  close: PropTypes.string.isRequired,
};

import { createTheme } from '@mui/material';

// Background of modal styling:
export const backgroundStyle = {
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
export const headingStyle = {
  bgcolor: '#3E4C61',
  color: 'white',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  boxShadow: 4,
};

export const headingText = {
  fontSize: 29,
};

// "X" icon styling:
export const closeIconStyle = {
  color: '#C5C5C5',
  position: 'absolute',
  right: 8,
  top: 8,
};

// Footer styling
export const footerStyle = {
  bgcolor: '#F2F2F2',
  color: 'white',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
};

// Button styling
export const buttonTheme = createTheme({
  palette: {
    archive: {
      main: '#EC6E6E',
      contrastText: '#fff',
    },
    cancel: {
      main: '#6C6C6C',
      contrastText: '#868686',
    },
    submit: {
      main: '#6DBB7A',
      contrastText: '#fff',
    },
  },
});

export const buttonText = {
  fontSize: '20px',
  fontFamily: 'roboto',
};

export const buttonBackground = {
  minWidth: '130px',
  minHeight: '50px',
};

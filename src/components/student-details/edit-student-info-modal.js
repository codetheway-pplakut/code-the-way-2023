import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { GenericModal } from '../shared/generic-modal';
import { TextFieldWithErrorMessage } from '../shared/text-field-with-error-message';
import { editStudent } from '../../services/students/students';

export default function EditStudentInfoModal(props) {
  const { student, onSaveSuccess, isParent } = props;

  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentCellPhone, setStudentCellPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [studentApartmentNumber, setStudentApartmentNumber] = useState('');
  const [studentCity, setStudentCity] = useState('');
  const [studentState, setStudentState] = useState('');
  const [studentDateOfBirth, setStudentDateOfBirth] = useState('');
  const [studentZipCode, setStudentZipCode] = useState('');

  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [parentCellPhone, setParentCellPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [address, setAddress] = useState('');
  const [parentApartmentNumber, setParentApartmentNumber] = useState('');
  const [parentCity, setParentCity] = useState('');
  const [parentState, setParentState] = useState('');
  const [parentZipCode, setParentZipCode] = useState('');
  const [header, setHeader] = useState('');

  useEffect(() => {
    if (isParent) {
      setParentFirstName(student.parentFirstName);
      setParentLastName(student.parentLastName);
      setParentCellPhone(student.parentCellPhone);
      setParentEmail(student.parentEmail);
      setAddress(student.address);
      setParentApartmentNumber(student.parentApartmentNumber);
      setParentState(student.parentState);
      setParentCity(student.parentCity);
      setParentZipCode(student.parentZipCode);
      setHeader('Edit Parent Information');
    } else {
      setStudentFirstName(student.studentFirstName);
      setStudentLastName(student.studentLastName);
      setStudentCellPhone(student.studentCellPhone);
      setStudentEmail(student.studentEmail);
      setStudentAddress(student.studentAddress);
      setStudentApartmentNumber(student.studentApartmentNumber);
      setStudentState(student.studentState);
      setStudentCity(student.studentCity);
      setStudentZipCode(student.studentZipCode);
      setStudentDateOfBirth(student.studentDateOfBirth);
      setHeader('Edit Student Information');
    }
  }, [student]);

  const requestSave = async () => {
    const updatedStudent = {
      ...student,
      studentFirstName,
      studentLastName,
      studentCellPhone,
      studentEmail,
      studentAddress,
      studentApartmentNumber,
      studentCity,
      studentState,
      studentZipCode,
      studentDateOfBirth,
    };
    const updatedParent = {
      ...student,
      parentFirstName,
      parentLastName,
      parentCellPhone,
      parentEmail,
      address,
      parentApartmentNumber,
      parentCity,
      parentState,
      parentZipCode,
    };

    await editStudent(isParent ? updatedParent : updatedStudent);

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <GenericModal
      actionButtonTitle="Submit"
      cancelButtonTitle="cancel"
      modalHeadingTitle={header}
      onActionButtonClick={requestSave}
      openModal={<EditIcon />}
    >
      <Grid container spacing={1} padding={4}>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <TextFieldWithErrorMessage
              label="First Name"
              onChange={(value) =>
                isParent
                  ? setParentFirstName(value)
                  : setStudentFirstName(value)
              }
              value={isParent ? parentFirstName : studentFirstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldWithErrorMessage
              label="Last Name"
              onChange={(value) =>
                isParent ? setParentLastName(value) : setStudentLastName(value)
              }
              value={isParent ? parentLastName : studentLastName}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            fullWidth
            label="Preferred Phone Number"
            onChange={(value) =>
              isParent ? setParentCellPhone(value) : setStudentCellPhone(value)
            }
            value={isParent ? parentCellPhone : studentCellPhone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldWithErrorMessage
            label="Email"
            onChange={(value) =>
              isParent ? setParentEmail(value) : setStudentEmail(value)
            }
            value={isParent ? parentEmail : studentEmail}
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <TextFieldWithErrorMessage
              label="Address"
              onChange={(value) =>
                isParent ? setAddress(value) : setStudentAddress(value)
              }
              value={isParent ? address : studentAddress}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="Apt."
              onChange={(value) =>
                isParent
                  ? setParentApartmentNumber(value)
                  : setStudentApartmentNumber(value)
              }
              value={isParent ? parentApartmentNumber : studentApartmentNumber}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="City"
              onChange={(value) =>
                isParent ? setParentCity(value) : setStudentCity(value)
              }
              value={isParent ? parentCity : studentCity}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="State"
              onChange={(value) =>
                isParent ? setParentState(value) : setStudentState(value)
              }
              value={isParent ? parentState : studentState}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithErrorMessage
              label="Zip Code"
              onChange={(value) =>
                isParent ? setParentZipCode(value) : setStudentZipCode(value)
              }
              value={isParent ? parentZipCode : studentZipCode}
            />
          </Grid>

          {!isParent && (
            <Grid item my={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  margin="normal"
                  sx={{ width: 210 }}
                  label="Date of Birth"
                  value={dayjs(studentDateOfBirth)}
                  onChange={(newValue) => setStudentDateOfBirth(newValue)}
                />
              </LocalizationProvider>
            </Grid>
          )}
        </Grid>
      </Grid>
    </GenericModal>
  );
}

EditStudentInfoModal.propTypes = {
  student: PropTypes.object,
  onSaveSuccess: PropTypes.func,
  isParent: PropTypes.bool,
};

EditStudentInfoModal.defaultProps = {
  student: undefined,
  onSaveSuccess: undefined,
  isParent: false,
};

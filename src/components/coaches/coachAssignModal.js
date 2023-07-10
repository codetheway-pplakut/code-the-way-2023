import { useState } from 'react';
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function CoachAssignModal2(props) {
  const { studentId, coachId, confirmHandler, coaches } = props;
  const [open, setOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(coachId || 'Unassigned');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCoachChange = (event) => {
    setSelectedCoach(event.target.value);
  };

  const handleConfirm = async () => {
    await confirmHandler(studentId, selectedCoach);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Assign Coach</Button>
      <Modal open={open} onClose={handleClose}>
        <div>
          <h2>Assign Coach to Student</h2>
          <FormControl>
            <InputLabel>Coach</InputLabel>
            <Select value={selectedCoach} onChange={handleCoachChange}>
              <MenuItem value="Unassigned">Unassigned</MenuItem>
              {coaches.map((coach) => (
                <MenuItem value={coach.id} key={coach.id}>
                  {`${coach.coachLastName}, ${coach.coachFirstName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </Modal>
    </div>
  );
}
export default CoachAssignModal2;

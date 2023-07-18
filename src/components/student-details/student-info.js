import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import StudentDetails from './student-details-page';
import { getStudentById } from '../../services/students/students';
import { CircularProgressOverlay } from '../circular-progress-overlay/circular-progress-overlay';
import { LayoutError } from '../layout/layout-error/layout-error';

/**
 * StudentInfo (student-info.js) is the student details page. It handles all of the API and contains student-details-page and student-info-display.
 */
export function StudentInfo() {
  const [student, setStudent] = useState({});
  const [goals, setGoals] = useState({});
  const [careers, setCareers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const location = useLocation();
  const { studentId } = location.state;

  const requestStudent = async (id) => {
    try {
      setHasError(false);
      setIsLoading(true);
      const response = await getStudentById(id);
      const { data } = response;
      setStudent(data.student);
      setGoals(data.student.goals);

      const careerData = {
        studentCareerPath: data.student.studentCareerPath,
        studentCareerInterest: data.student.studentCareerInterest,
        careerPathList: data.student.careerPathList,
        careerDeclaration: data.student.careerDeclaration,
      };
      setCareers(careerData);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    requestStudent(studentId);
  }, [studentId]);

  // Memoize the student details component to prevent unnecessary re-renders
  const memoizedStudentDetails = useMemo(
    () => (
      <StudentDetails
        student={student}
        goals={goals}
        careers={careers}
        onReload={() => requestStudent(studentId)}
      />
    ),
    [student]
  );

  if (isLoading) return <CircularProgressOverlay />;
  if (hasError) return <LayoutError />;

  return <div>{memoizedStudentDetails}</div>;
}

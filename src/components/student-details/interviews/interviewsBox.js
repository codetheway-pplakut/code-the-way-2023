import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Box } from '@mui/system';
import { LayoutPreloader } from '../../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../../layout/layout-error/layout-error';
import { getStudentResponseHandler } from '../../interviews/interviewsHandler';

export function InterviewsBox(props) {
  const { student } = props;
  const studentId = student.id;
  const [questions, setQuestions] = useState([{}]);
  const [interviewName, setInterviewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchGoals = () => {
      setIsLoading(true);
      setHasError(false);

      getStudentResponseHandler(studentId).then((response) => {
        setQuestions(response.data.questions);
        setInterviewName(response.data.interviewName);
        setIsLoading(false);
      });
    };
    fetchGoals();
  }, [studentId]);

  if (isLoading) return <LayoutPreloader />;
  if (hasError) return <LayoutError />;

  return (
    <Box>
      <h1>{interviewName}</h1>
      {questions !== null &&
        questions.length > 0 &&
        questions.map((question) => {
          return (
            <React.Fragment key={question.id}>
              <h6>Question: {question.questionString}</h6>
              <h6>Answer: {question.answerString}</h6>
            </React.Fragment>
          );
        })}
    </Box>
  );
}

InterviewsBox.propTypes = {
  student: propTypes.string.isRequired,
};

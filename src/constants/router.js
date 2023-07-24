import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';
import { Error } from '../components/error/error';
import { Login } from '../components/login/login';
import { Splash } from '../components/splash/splash';
import { Students } from '../components/students/students';
import { Coaches } from '../components/coaches/coaches';
import { InactiveRejected } from '../components/inactive-rejected/inactive-rejected';
import { StudentInfo } from '../components/student-details/student-info';
import { Admins } from '../components/admin/admin';
import { QuestionsTable } from '../components/interviews/QuestionsTable';
import { Interviews } from '../components/interviews/InterviewsIndex/interviews';
import { AnswerInterview } from '../components/interviews/answerInterview';

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Splash /> },
      { path: 'admins', element: <Admins /> },
      { path: 'coaches', element: <Coaches /> },
      { path: 'login', element: <Login /> },
      { path: 'students', element: <Students /> },
      { path: 'inactive-rejected', element: <InactiveRejected /> },
      { path: 'student-info', element: <StudentInfo /> },
      { path: 'interviews', element: <Interviews /> },
      { path: 'interview', element: <QuestionsTable /> },
      { path: 'AnswerInterview', element: <AnswerInterview /> },
      { path: '*', element: <Error /> },
    ],
  },
]);

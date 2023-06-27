import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';
import { Error } from '../components/error/error';
import { Login } from '../components/login/login';
import { isProduction } from '../utils/is-production/is-production';
import { Splash } from '../components/splash/splash';
import { Students } from '../components/students/students';
import { Coaches } from '../components/coaches/coaches';
import { Goals } from '../components/goals/goals';
import { InactiveRejected } from '../components/inactive-rejected/inactive-rejected';
import { StudentInfo } from '../components/student-details/student-info';
import { Admins } from '../components/admin/admin';

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Splash /> },
      { path: 'admins', element: <Admins /> },
      { path: 'coaches', element: <Coaches /> },
      { path: 'login', element: <Login /> },
      { path: 'goals', element: <Goals /> },
      { path: 'students', element: <Students /> },
      { path: 'inactive-rejected', element: <InactiveRejected /> },
      { path: 'student-info', element: <StudentInfo /> },
      { path: '*', element: <Error /> },
    ],
  },
]);

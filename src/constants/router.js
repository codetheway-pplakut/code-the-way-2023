import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';
import { Error } from '../components/error/error';
import { Login } from '../components/login/login';
import { isProduction } from '../utils/is-production/is-production';
import packageJson from '../../package.json';
import { Splash } from '../components/splash/splash';
import { Students } from '../components/students/students';
import { Coaches } from '../components/coaches/coaches';
import { Goals } from '../components/goals/goals';
import { StudentInfo } from '../components/student-details/student-info';

const basename = isProduction() ? `/${packageJson.name}` : '';

export const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Splash /> },
        { path: 'coaches', element: <Coaches /> },
        { path: 'login', element: <Login /> },
        { path: 'goals', element: <Goals /> },
        { path: 'students', element: <Students /> },
        { path: '*', element: <Error /> },
        { path: 'student-info', element: <StudentInfo /> },
      ],
    },
  ],
  { basename }
);

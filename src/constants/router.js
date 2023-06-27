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
import { Admins } from '../components/admin/admin';
import packageJson from '../../package.json';

const basename = isProduction() ? `/${packageJson.name}` : '';

export const ROUTER = createBrowserRouter(
  [
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
        { path: '*', element: <Error /> },
      ],
    },
  ],
  { basename }
);

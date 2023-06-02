import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';
import { Error } from '../components/error/error';
import { Splash } from '../components/splash/splash';

export const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: '/splash',
          handle: { breadcrumb: 'Splash' },
          element: <Splash />,
        },
      ],
    },
  ],
  {
    baseName: '',
  }
);

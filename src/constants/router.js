import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';
import { Error } from '../components/error/error';
import { Splash } from '../components/splash/splash';
import { TabularDemo } from '../components/tabular-demo/tabular-demo';

export const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: '/tabular-demo',
          handle: { breadcrumb: 'Tabular Demo' },
          element: <TabularDemo />,
        },
        {
          path: '/',
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

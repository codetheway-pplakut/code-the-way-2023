import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';
import { Error } from '../components/error/error';
import { Login } from '../components/login/login';
import { Public } from '../components/public/public';
import { SampleLayouts } from '../components/sample-layouts/sample-layouts';
import { StandardLayout } from '../components/sample-layouts/standard-layout/standard-layout';
import { TabularLayout } from '../components/sample-layouts/tabular-layout/tabular-layout';

export const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Public /> },
        { path: 'login', element: <Login /> },
        { path: 'sample-layouts', element: <SampleLayouts /> },
        { path: 'sample-layouts/standard', element: <StandardLayout /> },
        { path: 'sample-layouts/tabular', element: <TabularLayout /> },
        { path: '*', element: <Error /> },
      ],
    },
  ],
  { basename: '' }
);

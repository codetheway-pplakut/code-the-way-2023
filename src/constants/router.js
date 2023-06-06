import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';
import { Error } from '../components/error/error';
import { Login } from '../components/login/login';
import { Welcome } from '../components/sample/welcome/welcome';
import { SampleLayouts } from '../components/sample/sample-layouts/sample-layouts';
import { StandardLayout } from '../components/sample/standard-layout/standard-layout';
import { TabularLayout } from '../components/sample/tabular-layout/tabular-layout';

export const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Welcome /> },
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

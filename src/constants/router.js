import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';
import { PageNotFound } from '../components/page-not-found/page-not-found';
import { Layout } from '../components/layout/layout';

export const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: '/test',
          element: <Layout />,
        },
      ],
    },
  ],
  {
    baseName: '',
  }
);

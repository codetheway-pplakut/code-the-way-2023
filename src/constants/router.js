import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';

export const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
  ],
  {
    baseName: '',
  }
);

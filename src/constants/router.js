import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { App } from '../components/app/app';
import { Error } from '../components/error/error';
import { Login } from '../components/login/login';
import { Public } from '../components/public/public';
import { SampleLayouts } from '../components/sample-layouts/sample-layouts';
import { StandardLayout } from '../components/sample-layouts/standard-layout/standard-layout';
import { TabularLayout } from '../components/sample-layouts/tabular-layout/tabular-layout';

export const ROUTER = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Public />} />
      <Route path="login" element={<Login />} />
      <Route path="sample-layouts" element={<SampleLayouts />} />
      <Route path="sample-layouts/standard" element={<StandardLayout />} />
      <Route path="sample-layouts/tabular" element={<TabularLayout />} />
      <Route path="*" element={<Error />} />
    </Route>
  ),
  { basename: '' }
);

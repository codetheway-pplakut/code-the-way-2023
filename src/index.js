import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ROUTER } from './constants/router';

const root = createRoot(document.getElementById('app'));
root.render(<RouterProvider router={ROUTER} />);

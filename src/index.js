import '@fontsource/public-sans';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ROUTER } from './constants/router';

const root = createRoot(document.getElementById('app'));
root.render(<RouterProvider router={ROUTER} />);

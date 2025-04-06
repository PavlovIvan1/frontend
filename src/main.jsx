import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.scss';

import { router } from './config/pages.config.jsx';

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
);

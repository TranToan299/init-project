import { Navigate, useRoutes } from 'react-router-dom';
// auth
// layouts
import MainLayout from '../layouts/main';
// config
//
import {
  HomePage
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
      // Main Routes
    {
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },       
      ],
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

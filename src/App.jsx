import './App.css';
import { LandingPage } from './components/pages/Landing';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { GraphsPage } from './components/pages/DataVisualizations/GraphsPage.jsx';
import { NotFoundPage } from './components/pages/NotFound/index.jsx';
import * as React from 'react';
import Profile from './components/pages/Profile/index.jsx';
import { pageWrapper } from './components/layout/PageWrapper.jsx';
import { Auth0ProviderWithConfig } from './auth/auth0-provider-with-config';
import { ProtectedRoute } from './auth/ProtectedRoute';

const AppLayout = () => (
  <Auth0ProviderWithConfig>
    <Outlet />
  </Auth0ProviderWithConfig>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: pageWrapper(<LandingPage />),
      },
      {
        path: '/graphs',
        element: pageWrapper(<GraphsPage />),
      },
      {
        path: '/profile',
        element: pageWrapper(
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export const App = () => {
  return (
    <div className='font-serif w-[100vw] h-[100vh] m-0 flex-c justify-between align-centre text-center min-h-screen secondary-c'>
      <RouterProvider router={router} />
    </div>
  );
};

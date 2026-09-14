import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/App.tsx';
import { MainLayout } from '@/layout/MainLayout.tsx';
import { AuthLayout } from '@/layout/AuthLayout.tsx';
import { Login } from '@/features/auth/components/Login.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <h1 className="text-3xl">Supiki deruji bazeyo!</h1>,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router };

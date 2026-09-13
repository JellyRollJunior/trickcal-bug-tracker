import type { RouteObject } from 'react-router-dom';
import { App } from '@/App.tsx';
import { MainLayout } from '@/layout/MainLayout.tsx';
import { AuthLayout } from '@/layout/AuthLayout.tsx';

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
            element: <h1>This is the login page!</h1>,
          },
        ],
      },
    ],
  },
];

export { routes };

import type { RouteObject } from 'react-router-dom';
import { App } from '@/App.tsx';
import { MainLayout } from '@/layouts/MainLayout.tsx';

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
    ],
  },
];

export { routes };

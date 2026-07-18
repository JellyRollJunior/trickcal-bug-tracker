import type { RouteObject } from 'react-router-dom';
import { App } from '@/app/App.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
];

export { routes };

import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/App.tsx';
import { BoardLayout } from '@/layout/BoardLayout.tsx';
import { AuthLayout } from '@/layout/AuthLayout.tsx';
import { Login } from '@/features/auth/components/Login/Login.tsx';
import { Board } from '@/features/boards/components/Board/Board.tsx';
import { BoardDataLayer } from '@/features/boards/components/BoardDataLayer/BoardDataLayer.tsx';
import { BoardTicketLayout } from '@/features/boards/components/BoardTicketLayout.tsx';
import { SignupForm } from '@/features/auth/components/SignupForm/SignupForm.tsx';
import { OAuthCallback } from '@/features/auth/components/OAuthCallback/OAuthCallback.tsx';
import { BoardStartPage } from '@/features/boards/components/BoardStartPage.tsx';
import { LandingPage } from '@/layout/LandingPage.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/auth/login',
            element: <Login />,
          },
          {
            path: '/auth/signup',
            element: <SignupForm />,
          },
          {
            path: '/auth/callback',
            element: <OAuthCallback />,
          },
        ],
      },
      {
        element: <BoardLayout />,
        children: [
          {
            path: '/boards',
            element: <BoardStartPage />,
          },
          {
            path: '/boards/:boardId',
            element: <BoardDataLayer />,
            children: [
              { index: true, element: <Board /> },
              {
                path: 'tickets/:ticketId',
                element: <BoardTicketLayout />,
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router };

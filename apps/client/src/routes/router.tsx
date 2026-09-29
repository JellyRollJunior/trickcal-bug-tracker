import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/App.tsx';
import { MainLayout } from '@/layout/MainLayout.tsx';
import { AuthLayout } from '@/layout/AuthLayout.tsx';
import { LoginForm } from '@/features/auth/components/Login/LoginForm.tsx';
import { Board } from '@/features/boards/components/Board/Board.tsx';
import { BoardLayout } from '@/features/boards/components/BoardLayout';
import { TicketView } from '@/features/tickets/components/TicketView.tsx';

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
          {
            path: '/boards/:boardId',
            element: <BoardLayout />,
            children: [
              { index: true, element: <Board /> },
              {
                path: 'tickets/:ticketId',
                element: (
                  <div className="grid flex-1 min-h-0 grid-cols-2">
                    <Board />
                    {/* <TicketView /> */}
                    <TicketView />
                  </div>
                ),
              },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/auth/login',
            element: <LoginForm />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router };

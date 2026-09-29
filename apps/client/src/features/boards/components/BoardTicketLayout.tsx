import { Board } from '@/features/boards/components/Board/Board';
import { TicketView } from '@/features/tickets/components/TicketView.tsx';

const BoardTicketLayout = () => {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-2">
      <Board />
      <TicketView />
    </div>
  );
};

export { BoardTicketLayout };

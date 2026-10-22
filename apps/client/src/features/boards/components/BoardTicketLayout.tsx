import { Board } from '@/features/boards/components/Board/Board.tsx';
import { TicketView } from '@/features/tickets/components/TicketView/TicketView.tsx';

const BoardTicketLayout = () => {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
      <div className="hidden h-full lg:block">
        <Board />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <TicketView />
      </div>
    </div>
  );
};

export { BoardTicketLayout };

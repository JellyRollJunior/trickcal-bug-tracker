import type { TicketDto } from '@trickcal-bug-tracker/shared';
import { useState, type DragEventHandler } from 'react';
import { TicketGhost } from '@/features/tickets/components/Ticket.tsx';

type EmptySectionDropAreaProps = {
  isDragging: boolean;
  onDragOver: DragEventHandler;
  onDrop: DragEventHandler;
  ticket: TicketDto | null;
};
const EmptySectionDropArea = ({
  isDragging,
  onDragOver,
  onDrop,
  ticket,
}: EmptySectionDropAreaProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li
      className="flex h-full w-full flex-1 flex-col"
      style={
        isVisible
          ? { opacity: 1, transition: 'all 0.2s ease-in-out' }
          : { opacity: 0, transition: 'all 0.1s ease-in-out' }
      }
      onDragEnter={() => {
        if (isDragging) setIsVisible(true);
      }}
      onDragLeave={() => setIsVisible(false)}
      onDragOver={onDragOver}
      onDrop={(e) => {
        onDrop(e);
        setIsVisible(false);
      }}
    >
      {isVisible && <TicketGhost ticket={ticket} />}
    </li>
  );
};

export { EmptySectionDropArea };

import type {
    BoardDto,
    SectionWithTicketsDto,
    TicketDto,
} from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { useMoveTicket } from '@/features/tickets/hooks/useMoveTicket.ts';

const useBoardContent = (board: BoardDto) => {
    const [activeTicketId, setActiveTicketId] = useState<
        TicketDto['id'] | null
    >(null);

    const { moveTicket } = useMoveTicket();

    const handleMoveTicket = (
        toSection: SectionWithTicketsDto,
        targetTicketId: TicketDto['id'] | null,
        beforeTargetTicketId: TicketDto['id'] | null,
        position: 'BEFORE' | 'AFTER'
    ) => {
        if (!activeTicketId) return;
        if (activeTicketId === targetTicketId) return;

        if (position === 'AFTER') {
            moveTicket(activeTicketId, toSection.id, board.id, targetTicketId);
            console.log(`Moving ${activeTicketId} after ${targetTicketId}`);
        } else if (position === 'BEFORE') {
            moveTicket(
                activeTicketId,
                toSection.id,
                board.id,
                beforeTargetTicketId
            );
            console.log(`Moving ${activeTicketId} before ${targetTicketId}`);
        }
    };

    return { activeTicketId, setActiveTicketId, handleMoveTicket };
};

export { useBoardContent };

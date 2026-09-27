import type {
    BoardDto,
    SectionDto,
    TicketDto,
} from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { useMoveTicket } from '@/features/tickets/hooks/useMoveTicket.ts';

const useBoardContent = (boardId: BoardDto['id']) => {
    const [activeTicket, setActiveTicket] = useState<TicketDto['id'] | null>(null);

    const { moveTicket } = useMoveTicket();

    const handleMoveTicket = (
        sectionId: SectionDto['id'],
        previousTicketId: TicketDto['id'] | null
    ) => {
        if (!activeTicket) return;

        // disallow move below self
        if (activeTicket === previousTicketId) return
        // TODO: disallow move below ticket (self + 1)

        moveTicket(activeTicket, sectionId, boardId, previousTicketId);
    };

    return { activeTicket, setActiveTicket, handleMoveTicket };
};

export { useBoardContent };

import type {
    BoardWithSectionsAndTicketsDto,
    SectionDto,
    SectionWithTicketsDto,
    TicketDto,
} from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { useMoveTicket } from '@/features/tickets/hooks/useMoveTicket.ts';

type Position = 'BEFORE' | 'AFTER';
type DropTarget = {
    sectionId: SectionDto['id'];
    ticketId: TicketDto['id'] | null;
    position: Position;
} | null;

const useBoardContent = (board: BoardWithSectionsAndTicketsDto) => {
    const { moveTicket, isPending: isPendingMoveTicketId } = useMoveTicket();
    const [activeTicket, setActiveTicket] = useState<TicketDto | null>(null);
    const [dropTarget, setDropTarget] = useState<DropTarget>(null);

    const handleMoveTicket = (
        toSection: SectionWithTicketsDto,
        targetTicketId: TicketDto['id'] | null,
        beforeTargetTicketId: TicketDto['id'] | null,
        position: Position
    ) => {
        if (!activeTicket) return;
        if (activeTicket.id === targetTicketId) return;

        if (position === 'AFTER') {
            moveTicket(activeTicket.id, toSection.id, board.id, targetTicketId);
            console.log(`Moving ${activeTicket.id} after ${targetTicketId}`);
        } else if (position === 'BEFORE') {
            moveTicket(
                activeTicket.id,
                toSection.id,
                board.id,
                beforeTargetTicketId
            );
            console.log(`Moving ${activeTicket.id} before ${targetTicketId}`);
        }
    };

    return {
        activeTicket,
        setActiveTicket,
        dropTarget,
        setDropTarget,
        handleMoveTicket,
        isPendingMoveTicketId
    };
};

export type { Position, DropTarget };
export { useBoardContent };

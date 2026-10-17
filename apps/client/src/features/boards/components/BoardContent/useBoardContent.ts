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
    const { moveTicket } = useMoveTicket();
    const [activeTicketId, setActiveTicketId] = useState<
        TicketDto['id'] | null
    >(null);
    const [dropTarget, setDropTarget] = useState<DropTarget>(null);

    const handleMoveTicket = (
        toSection: SectionWithTicketsDto,
        targetTicketId: TicketDto['id'] | null,
        beforeTargetTicketId: TicketDto['id'] | null,
        position: Position
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

    return {
        activeTicketId,
        setActiveTicketId,
        dropTarget,
        setDropTarget,
        handleMoveTicket,
    };
};

export type { Position, DropTarget };
export { useBoardContent };
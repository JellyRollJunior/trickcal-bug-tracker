import type {
    BoardWithSectionsAndTicketsDto,
    SectionDto,
    SectionWithTicketsDto,
    TicketDto,
} from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { useMoveTicket } from '@/features/tickets/hooks/useMoveTicket.ts';
import { toast } from 'sonner';

type Position = 'BEFORE' | 'AFTER';
type DropTarget = {
    sectionId: SectionDto['id'];
    ticketId: TicketDto['id'] | null;
    position: Position;
} | null;

const useBoardContent = (board: BoardWithSectionsAndTicketsDto) => {
    const {
        canMove,
        moveTicket,
    } = useMoveTicket();
    const [activeTicket, setActiveTicket] = useState<TicketDto | null>(null);
    const [dropTarget, setDropTarget] = useState<DropTarget>(null);

    const handleMoveTicket = (
        toSection: SectionWithTicketsDto,
        targetTicketId: TicketDto['id'] | null,
        beforeTargetTicketId: TicketDto['id'] | null,
        afterTargetTicketId: TicketDto['id'] | null,
        position: Position
    ) => {
        if (!activeTicket) return;
        if (activeTicket.id === targetTicketId) return;
        if (position === 'AFTER' && afterTargetTicketId === activeTicket.id) return;
        if (position === 'BEFORE' && beforeTargetTicketId === activeTicket.id) return;

        if (!canMove) {
            toast.error('Unable to move ticket');
            return;
        }

        const previousTicketId = position === 'AFTER' ? targetTicketId : beforeTargetTicketId;
        moveTicket(activeTicket.id, toSection.id, board.id, previousTicketId);

        setActiveTicket(null);
        setDropTarget(null);
    };

    return {
        activeTicket,
        setActiveTicket,
        dropTarget,
        setDropTarget,
        handleMoveTicket,
    };
};

export type { Position, DropTarget };
export { useBoardContent };

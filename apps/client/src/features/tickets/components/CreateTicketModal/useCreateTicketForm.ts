import type { z } from 'zod';
import type {
    BoardDto,
    postTicketsRequestBodySchema,
    SectionDto,
} from '@trickcal-bug-tracker/shared';
import type { SubmitEvent } from 'react';
import { useCreateTicket } from '@/features/tickets/hooks/useCreateTicket.ts';
import { useTicketFormStates } from '@/features/tickets/components/TicketForm/useTicketFormStates.ts';

type TicketPayload = z.infer<typeof postTicketsRequestBodySchema>;

const useCreateTicketForm = (
    boardId: BoardDto['id'],
    sectionId: SectionDto['id'],
    closeModal: () => void
) => {
    const ticketFormStates = useTicketFormStates();
    const {
        summary,
        description,
        issueType,
        category,
        priority,
        severity,
        reproducibility,
        assigneeId,
        reset,
    } = ticketFormStates;
    const {
        mutate: createTicket,
        isPending: isPendingCreateTicket,
        isSuccess: isSuccessCreateTicket,
    } = useCreateTicket(boardId);

    const toPayload = (): TicketPayload => ({
        summary,
        description,
        issueType: issueType as TicketPayload['issueType'],
        category: category as TicketPayload['category'],
        priority: priority as TicketPayload['priority'],
        severity: severity as TicketPayload['severity'],
        reproducibility,
        assigneeId,
    });

    const handleCreateTicket = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        createTicket(
            {
                boardId,
                sectionId,
                data: toPayload(),
            },
            {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            }
        );
    };

    return {
        ticketFormStates,
        reset,
        handleCreateTicket,
        isPendingCreateTicket,
        isSuccessCreateTicket,
    };
};

export type { TicketPayload };
export { useCreateTicketForm };

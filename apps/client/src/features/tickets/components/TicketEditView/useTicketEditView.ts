import type {
    BoardDto,
    patchTicketsRequestBodySchema,
    TicketDto,
} from '@trickcal-bug-tracker/shared';
import type { z } from 'zod';
import { useTicketFormStates } from '@/features/tickets/components/TicketForm/useTicketFormStates.ts';
import { usePatchTicket } from '@/features/tickets/hooks/usePatchTicket.ts';
import type { SubmitEvent } from 'react';

type TicketPayload = z.infer<typeof patchTicketsRequestBodySchema>;

const useTicketEditView = (
    boardId: BoardDto['id'],
    ticketId: TicketDto['id'],
    closeUi: () => void,
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
        reset,
    } = ticketFormStates;
    const { mutate: patchTicket, isPending: isPendingPatchTicket } = usePatchTicket(boardId);

    const toPayload = (): TicketPayload => ({
        summary: summary ? summary : undefined,
        description: description ? description : undefined,
        issueType: issueType ? issueType : undefined,
        category: category ? category : undefined,
        priority: priority ? priority : undefined,
        severity: severity ? severity : undefined,
        reproducibility: reproducibility !== null ? reproducibility : undefined,
    });

    const handleSubmitEditForm = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        let mutated = false;

        // if payload contains >= 1 non undefined value, patch ticket
        const patchPayload = toPayload();
        const hasChanges = Object.values(patchPayload).some(
            (value) => value !== undefined
        );
        if (hasChanges) {
            patchTicket({ ticketId, data: patchPayload });
            mutated = true;
        }

        // if assigneeId set, update assignee
        if (mutated) {
            closeUi();
        }
    };

    return { ticketFormStates, reset, handleSubmitEditForm, isPendingPatchTicket };
};

export { useTicketEditView };

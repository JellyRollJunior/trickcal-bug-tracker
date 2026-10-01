import type {
    BoardDto,
    patchTicketsRequestBodySchema,
    putAssigneeRequestBodySchema,
    TicketDto,
} from '@trickcal-bug-tracker/shared';
import type { z } from 'zod';
import type { SubmitEvent } from 'react';
import { useTicketFormStates } from '@/features/tickets/components/TicketForm/useTicketFormStates.ts';
import { usePatchTicket } from '@/features/tickets/hooks/usePatchTicket.ts';
import { usePutAssignee } from '@/features/tickets/hooks/usePutAssignee.ts';

type PatchTicketPayload = z.infer<typeof patchTicketsRequestBodySchema>;
type PutAssigneePayload = z.infer<typeof putAssigneeRequestBodySchema>;

const useTicketEditView = (
    boardId: BoardDto['id'],
    ticket: TicketDto,
    closeUi: () => void
) => {
    const ticketFormStates = useTicketFormStates(ticket);
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
    const patchTicket = usePatchTicket(boardId);
    const putAssignee = usePutAssignee(boardId);

    const toPatchTicketPayload = (): PatchTicketPayload => ({
        summary: summary ? summary : undefined,
        description: description ? description : undefined,
        issueType: issueType ? issueType : undefined,
        category: category ? category : undefined,
        priority: priority ? priority : undefined,
        severity: severity ? severity : undefined,
        reproducibility: reproducibility !== null ? reproducibility : undefined,
    });

    const toPutAssigneePayload = (): PutAssigneePayload => ({
        assigneeId: assigneeId,
    });

    const handleSubmitEditForm = async (
        event: SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        let mutated = false;

        // if payload contains >= 1 non undefined value, patch ticket
        const patchPayload = toPatchTicketPayload();
        const hasChanges = Object.values(patchPayload).some(
            (value) => value !== undefined
        );
        if (hasChanges) {
            await patchTicket.mutateAsync(
                { ticketId: ticket.id, data: patchPayload },
                {
                    onSuccess: () => {
                        mutated = true;
                    },
                }
            );
        }

        // if assigneeId set, update assignee
        if (assigneeId !== ticket.assignee?.id) {
            await putAssignee.mutateAsync(
                { ticketId: ticket.id, data: toPutAssigneePayload() },
                {
                    onSuccess: () => {
                        mutated = true;
                    },
                }
            );
        }

        if (mutated) {
            reset(ticket);
            closeUi();
        }
    };

    return {
        ticketFormStates,
        reset,
        handleSubmitEditForm,
        isPendingSubmit: patchTicket.isPending || putAssignee.isPending,
    };
};

export { useTicketEditView };

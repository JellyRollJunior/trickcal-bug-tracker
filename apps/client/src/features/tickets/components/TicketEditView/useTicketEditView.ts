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
import { toast } from 'sonner';

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

    const changed = <T>(next: T | '' | null, prev: T): T | undefined => {
        return next === '' || next === null || next === prev ? undefined : next;
    };
    const toPatchTicketPayload = (): PatchTicketPayload => ({
        summary: changed(summary, ticket.summary),
        description: changed(description, ticket.description),
        issueType: changed(issueType, ticket.issueType),
        category: changed(category, ticket.category),
        priority: changed(priority, ticket.priority),
        severity: changed(severity, ticket.severity),
        reproducibility: changed(reproducibility, ticket.reproducibility),
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
        if (assigneeId != ticket.assignee?.id) {
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
        } else {
            toast('No ticket changes detected');
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

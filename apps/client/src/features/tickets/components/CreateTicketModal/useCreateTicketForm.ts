import type { z } from 'zod';
import type {
    BoardDto,
    postTicketsRequestBodySchema,
    SectionDto,
} from '@trickcal-bug-tracker/shared';
import { useState, type SubmitEvent } from 'react';
import { useCreateTicket } from '@/features/tickets/hooks/useCreateTicket.ts';

type TicketPayload = z.infer<typeof postTicketsRequestBodySchema>;

const useCreateTicketForm = (
    boardId: BoardDto['id'],
    sectionId: SectionDto['id'],
    closeModal: () => void,
) => {
    const [summary, setSummary] = useState<TicketPayload['summary']>('');
    const [description, setDescription] = useState<TicketPayload['description']>('');
    const [issueType, setIssueType] = useState<TicketPayload['issueType'] | ''>('');
    const [category, setCategory] = useState<TicketPayload['category'] | ''>('');
    const [priority, setPriority] = useState<TicketPayload['priority'] | ''>('');
    const [severity, setSeverity] = useState<TicketPayload['severity'] | ''>('');
    const [reproducibility, setReproducibility] = useState<TicketPayload['reproducibility']>(false);
    const [assigneeId, setAssigneeId] = useState<TicketPayload['assigneeId']>(null);
    const { 
        mutate: createTicket, 
        isPending: isPendingCreateTicket,
        isSuccess: isSuccessCreateTicket, 
    } = useCreateTicket(boardId);
        
    const reset = () => {
        setSummary('');
        setDescription('');
        setIssueType('');
        setCategory('');
        setPriority('');
        setSeverity('');
        setReproducibility(false);
        setAssigneeId(null);
    };

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
        summary,
        setSummary,
        description,
        setDescription,
        issueType,
        setIssueType,
        category,
        setCategory,
        priority,
        setPriority,
        severity,
        setSeverity,
        reproducibility,
        setReproducibility,
        assigneeId,
        setAssigneeId,
        reset,
        handleCreateTicket,
        isPendingCreateTicket,
        isSuccessCreateTicket,
    };
};

export type { TicketPayload };
export { useCreateTicketForm };

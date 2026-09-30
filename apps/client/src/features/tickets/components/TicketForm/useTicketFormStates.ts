import type { z } from 'zod';
import type { postTicketsRequestBodySchema } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';

type TicketPayload = z.infer<typeof postTicketsRequestBodySchema>;

const useTicketFormStates = () => {
    const [summary, setSummary] = useState<TicketPayload['summary']>('');
    const [description, setDescription] = useState<TicketPayload['description']>('');
    const [issueType, setIssueType] = useState<TicketPayload['issueType'] | ''>('');
    const [category, setCategory] = useState<TicketPayload['category'] | ''>('');
    const [priority, setPriority] = useState<TicketPayload['priority'] | ''>('');
    const [severity, setSeverity] = useState<TicketPayload['severity'] | ''>('');
    const [reproducibility, setReproducibility] = useState<TicketPayload['reproducibility']>(false);
    const [assigneeId, setAssigneeId] = useState<TicketPayload['assigneeId']>(null);
          
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
    };
};

export { useTicketFormStates }
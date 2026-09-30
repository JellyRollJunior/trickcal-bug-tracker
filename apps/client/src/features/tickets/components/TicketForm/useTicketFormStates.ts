import type { z } from 'zod';
import type { postTicketsRequestBodySchema, TicketDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';

type TicketPayload = z.infer<typeof postTicketsRequestBodySchema>;

const useTicketFormStates = (ticket?: TicketDto) => {
    const [summary, setSummary] = useState<TicketPayload['summary']>(ticket ? ticket.summary : '');
    const [description, setDescription] = useState<TicketPayload['description']>(ticket ? ticket.description : '');
    const [issueType, setIssueType] = useState<TicketPayload['issueType'] | ''>(ticket ? ticket.issueType : '');
    const [category, setCategory] = useState<TicketPayload['category'] | ''>(ticket ? ticket.category : '');
    const [priority, setPriority] = useState<TicketPayload['priority'] | ''>(ticket ? ticket.priority : '');
    const [severity, setSeverity] = useState<TicketPayload['severity'] | ''>(ticket ? ticket.severity : '');
    const [reproducibility, setReproducibility] = useState<TicketPayload['reproducibility']>(ticket ? ticket.reproducibility : false);
    const [assigneeId, setAssigneeId] = useState<TicketPayload['assigneeId']>((ticket && ticket.assignee) ? ticket.assignee.id : null);
          
    const reset = (ticket?: TicketDto) => {
        setSummary(ticket ? ticket.summary : '');
        setDescription(ticket ? ticket.description : '');
        setIssueType(ticket ? ticket.issueType : '');
        setCategory(ticket ? ticket.category : '');
        setPriority(ticket ? ticket.priority : '');
        setSeverity(ticket ? ticket.severity : '');
        setReproducibility(ticket ? ticket.reproducibility : false);
        setAssigneeId((ticket && ticket.assignee) ? ticket.assignee.id : null);
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
import { useTicketFormStates } from '@/features/tickets/components/TicketForm/useTicketFormStates.ts';

const useTicketEditView = () => {
    const ticketFormStates = useTicketFormStates();
    const reset = ticketFormStates.reset;

    return { ticketFormStates, reset };
};

export { useTicketEditView };

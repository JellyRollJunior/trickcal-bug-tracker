import add from '@/assets/icons/add.svg';
import settings from '@/assets/icons/settings.svg';

import type {
  SectionDto,
  SectionWithTicketsDto,
  TicketDto,
} from '@trickcal-bug-tracker/shared';
import { Ticket } from '@/features/tickets/components/Ticket.tsx';
import { useState, type DragEventHandler } from 'react';



type SectionProps = {
  section: SectionWithTicketsDto;
  openCreateTicketModal: () => void;
  openSectionSettings: () => void;
  handleMoveTicket: (
    sectionId: SectionDto['id'],
    order: TicketDto['order'] | null
  ) => void;
  activeTicket: TicketDto['id'] | null;
  setActiveTicket: (ticketId: TicketDto['id'] | null) => void;
};
const Section = ({
  section,
  openCreateTicketModal,
  openSectionSettings,
  handleMoveTicket,
  activeTicket,
  setActiveTicket,
}: SectionProps) => {
  return (
    <div className="max-w-80 min-w-45 flex-1">
      {/* Section Data & Controls */}
      <div className="block-primary flex justify-between gap-1 p-2">
        <h3 className="self-center">{section.name}</h3>
        <div className="grid h-fit grid-cols-2 gap-1">
          <button
            className="button-primary rounded-full p-0.5"
            onClick={openCreateTicketModal}
          >
            <img src={add} />
          </button>
          <button
            className="button-primary rounded-full p-0.5"
            onClick={openSectionSettings}
          >
            <img src={settings} />
          </button>
        </div>
      </div>

      {/* Section Data */}
      <ol className="mt-1 flex flex-col gap-1">
        {section.tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            onDragStartHandler={() => setActiveTicket(ticket.id)}
            onDragEndHandler={() => setActiveTicket(null)}
          />
        ))}
      </ol>
    </div>
  );
};

export { Section };

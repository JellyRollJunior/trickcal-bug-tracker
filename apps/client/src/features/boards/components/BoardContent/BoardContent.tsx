import type {
  BoardWithSectionsAndTicketsDto,
  SectionDto,
  TicketDto,
} from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { Section } from '@/features/sections/components/Section.tsx';
import { CreateSectionListItem } from '@/features/sections/components/CreateSectionListItem/CreateSectionListItem.tsx';

type BoardContentProps = {
  board: BoardWithSectionsAndTicketsDto;
  openCreateTicket: (id: SectionDto['id']) => void;
  openSectionSettings: (id: SectionDto['id'], name: SectionDto['name']) => void;
};
const BoardContent = ({
  board,
  openCreateTicket,
  openSectionSettings,
}: BoardContentProps) => {
  const [activeTicket, setActiveTicket] = useState<TicketDto['id'] | null>(
    null
  );

  const handleMoveTicket = (
    sectionId: SectionDto['id'],
    prevTicketId: TicketDto['id'] | null
  ) => {
    if (!activeTicket) return;

    // insert code here: if order + section are the same, do not move
    console.log(
      `moving [ticket ${activeTicket}] to [section ${sectionId} - after ticket: ${prevTicketId}]`
    );
  };

  // Create Section List Item
  const lastSectionId = board?.sections.at(-1)?.id ?? '';

  return (
    <main>
      {/* Section List */}
      <ol className="flex flex-1 gap-3 overflow-x-auto">
        {board.sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            openCreateTicketModal={() => openCreateTicket(section.id)}
            openSectionSettings={() =>
              openSectionSettings(section.id, section.name)
            }
            handleMoveTicket={handleMoveTicket}
            activeTicket={activeTicket}
            setActiveTicket={setActiveTicket}
          />
        ))}

        {/* Create Section */}
        <CreateSectionListItem
          boardId={board.id}
          insertAfterSectionId={lastSectionId}
        />
      </ol>
    </main>
  );
};

export { BoardContent };

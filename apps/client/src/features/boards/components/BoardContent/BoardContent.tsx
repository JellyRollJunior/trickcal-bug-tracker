import type {
  BoardWithSectionsAndTicketsDto,
  SectionDto,
} from '@trickcal-bug-tracker/shared';
import { Section } from '@/features/sections/components/Section.tsx';
import { CreateSectionListItem } from '@/features/sections/components/CreateSectionListItem/CreateSectionListItem.tsx';
import { useBoardContent } from '@/features/boards/components/BoardContent/useBoardContent.ts';

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
  const { activeTicket, setActiveTicket, handleMoveTicket } = useBoardContent(
    board.id
  );

  // Create Section List Item
  const lastSectionId = board?.sections.at(-1)?.id ?? '';

  return (
    <main className='flex-1 flex flex-col'>
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

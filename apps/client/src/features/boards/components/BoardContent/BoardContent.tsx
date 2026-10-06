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
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-x-auto ">
      {/* Section List */}
      <ol className="flex flex-1 gap-3">
        {board.sections.map((section) => (
          <div className="max-w-100 min-w-75 flex-1">
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
          </div>
        ))}

        {/* Create Section */}
        <CreateSectionListItem
          boardId={board.id}
          insertAfterSectionId={lastSectionId}
        />
      </ol>
    </div>
  );
};

export { BoardContent };

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
  const {
    activeTicket,
    setActiveTicket,
    dropTarget,
    setDropTarget,
    handleMoveTicket,
    isPendingMoveTicketId
  } = useBoardContent(board);

  // Create Section List Item
  const lastSectionId = board?.sections.at(-1)?.id ?? '';

  return (
    <ol className="flex h-full min-h-0 w-full flex-1 gap-3 overflow-x-auto">
      {board.sections.map((section) => (
        <div className="min-h-0 max-w-100 min-w-75 flex-1" key={section.id}>
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
            dropTarget={dropTarget}
            setDropTarget={setDropTarget}
            isPendingMoveTicketId={isPendingMoveTicketId}
          />
        </div>
      ))}

      {/* Create Section */}
      <CreateSectionListItem
        boardId={board.id}
        insertAfterSectionId={lastSectionId}
      />
    </ol>
  );
};

export { BoardContent };

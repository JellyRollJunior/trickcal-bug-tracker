import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '@/features/sections/components/Section.tsx';
import { useBoardPage } from '@/features/boards/components/Board/useBoardPage.ts';
import { CreateTicketModal } from '@/features/tickets/components/CreateTicketModal/CreateTicketModal.tsx';
import { CreateSectionListItem } from '@/features/sections/components/CreateSectionListItem/CreateSectionListItem.tsx';

type BoardProps = { boardId: BoardDto['id'] };

const BoardContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3> Loading... </h3>;

  return <Board boardId={boardId} />;
};

const Board = ({ boardId }: BoardProps) => {
  const {
    board,
    isSuccessGetBoard,
    isPendingGetBoard,
    sectionId,
    setSectionId,
  } = useBoardPage(boardId);

  // Create Ticket Modal
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const openCreateTicket = (sectionId: SectionDto['id']) => {
    setSectionId(sectionId);
    setIsCreateTicketOpen(true);
  };
  const closeCreateTicket = () => {
    setIsCreateTicketOpen(false);
    setSectionId(null);
  };
  const allCollaborators = board ? [board.owner, ...board.collaborators] : [];

  // Create Section List Item
  const lastSectionId = board?.sections.at(-1)?.id ?? '';

  return (
    <div className="mx-2 mt-3 mb-3 flex flex-col gap-2">
      {board && isSuccessGetBoard && !isPendingGetBoard && (
        <>
          <h2 className="block-primary w-fit px-3 py-2">{board.name}</h2>
          <div className="block-primary w-fit px-3 py-2">
            {board.description}
          </div>

          {/* Section List */}
          <ol className="flex gap-3 overflow-x-auto pb-5">
            {board.sections.map((section) => (
              <Section
                openCreateTicketModal={() => openCreateTicket(section.id)}
                key={section.id}
                section={section}
              />
            ))}

            {/* Create Section */}
            <CreateSectionListItem
              boardId={board.id}
              insertAfterSectionId={lastSectionId}
            />
          </ol>
          {/* Create Ticket */}
          {isCreateTicketOpen && sectionId && (
            <CreateTicketModal
              open={isCreateTicketOpen}
              closeModal={closeCreateTicket}
              boardId={board.id}
              sectionId={sectionId}
              collaborators={allCollaborators}
            />
          )}
        </>
      )}
    </div>
  );
};

export { BoardContainer as Board };

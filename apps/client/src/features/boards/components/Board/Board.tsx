import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '@/features/sections/components/Section.tsx';
import { useBoardPage } from '@/features/boards/components/Board/useBoardPage.ts';
import { CreateTicketModal } from '@/features/tickets/components/CreateTicketModal/CreateTicketModal.tsx';

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
    handleCreateSection,
    isPendingCreateSection,
    sectionName,
    setSectionName,
  } = useBoardPage(boardId);

  // Create Section Form
  const [isCreateSectionOpen, setIsCreateSectionOpen] = useState(false);
  const openCreateSection = () => setIsCreateSectionOpen(true);
  const closeCreateSection = () => {
    setIsCreateSectionOpen(false);
    setSectionName('');
  };
  const createSectionRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (isCreateSectionOpen) {
      createSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'end',
        block: 'nearest',
      });
    }
  }, [isCreateSectionOpen]);

  // Create Ticket Modal
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [sectionId, setSectionId] = useState<SectionDto['id'] | null>(null);
  const openCreateTicket = (sectionId: SectionDto['id']) => {
    setSectionId(sectionId);
    setIsCreateTicketOpen(true);
  };
  const closeCreateTicket = () => {
    setIsCreateTicketOpen(false);
    setSectionId(null);
  };  
  const allCollaborators = board ? [board.owner, ...board.collaborators] : [];

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
            {!isCreateSectionOpen && (
              <button
                className="block-primary flex h-fit flex-1 justify-between py-2 pr-4 pl-3 text-nowrap disabled:bg-gray-300"
                disabled={isPendingCreateSection}
                onClick={openCreateSection}
              >
                + New Section
              </button>
            )}
            {isCreateSectionOpen && (
              <form
                ref={createSectionRef}
                className="block-primary h-fit w-fit px-3 py-2"
                onSubmit={(event) => {
                  handleCreateSection(event);
                  closeCreateSection();
                }}
              >
                <input
                  className="block-primary w-full py-1 pr-1 pl-2"
                  type="text"
                  placeholder="Section name"
                  minLength={1}
                  maxLength={26}
                  value={sectionName}
                  onChange={(event) => setSectionName(event?.target.value)}
                  required
                />
                <div className="mt-2 flex justify-start gap-1">
                  <button
                    className="button-primary px-3 py-1 disabled:bg-gray-300"
                    disabled={isPendingCreateSection}
                  >
                    Create
                  </button>
                  <button
                    className="button-primary px-3 py-1 disabled:bg-gray-300"
                    type="button"
                    onClick={closeCreateSection}
                    disabled={isPendingCreateSection}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
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

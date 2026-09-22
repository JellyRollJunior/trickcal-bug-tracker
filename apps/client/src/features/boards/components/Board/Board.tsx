import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '@/features/sections/components/Section.tsx';
import { useBoardPage } from '@/features/boards/components/Board/useBoardPage.ts';
import { CreateTicketModal } from '@/features/tickets/components/CreateTicketModal/CreateTicketModal.tsx';
import { CreateSectionListItem } from '@/features/sections/components/CreateSectionListItem/CreateSectionListItem.tsx';
import { AnimatePresence, motion } from 'motion/react';

type BoardProps = { boardId: BoardDto['id'] };

const BoardContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3> Loading... </h3>;

  return <Board boardId={boardId} />;
};

const Board = ({ boardId }: BoardProps) => {
  const { board, sectionId, setSectionId } = useBoardPage(boardId);

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

  // Section Settings
  const [isSectionSettingsOpen, setIsSectionSettingsOpen] = useState(true);
  const openSectionSettings = () => {
    setIsSectionSettingsOpen(true);
  };
  const closeSectionSettings = () => {
    setIsSectionSettingsOpen(false);
  };

  return (
    <div className="relative mx-2 mt-3 mb-3 flex flex-1 flex-col gap-2">
      {board && (
        <>
          <h2 className="block-primary w-fit px-3 py-2">{board.name}</h2>
          <div className="block-primary w-fit px-3 py-2">
            {board.description}
          </div>

          {/* Section List */}
          <ol className="flex flex-1 gap-3 overflow-x-auto">
            {board.sections.map((section) => (
              <Section
                openCreateTicketModal={() => openCreateTicket(section.id)}
                openSectionSettings={openSectionSettings}
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

          {/* Section Settings drawer */}
          <AnimatePresence>
            {isSectionSettingsOpen && (
              <motion.aside className="absolute top-0 right-0 h-screen min-w-1/3 border-1 border-black bg-white">
                <button
                  className="absolute -top-1.5 right-1.5 h-fit text-2xl"
                  onClick={closeSectionSettings}
                >
                  ×
                </button>
                <div>hi</div>
              </motion.aside>
            )}
          </AnimatePresence>

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

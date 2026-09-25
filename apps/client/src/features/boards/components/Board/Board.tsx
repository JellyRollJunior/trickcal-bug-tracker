import settings from '@/assets/icons/settings.svg';

import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Section } from '@/features/sections/components/Section.tsx';
import { useBoardPage } from '@/features/boards/components/Board/useBoardPage.ts';
import { CreateTicketModal } from '@/features/tickets/components/CreateTicketModal/CreateTicketModal.tsx';
import { CreateSectionListItem } from '@/features/sections/components/CreateSectionListItem/CreateSectionListItem.tsx';
import { SectionSettingsDrawer } from '@/features/sections/components/SectionSettingsDrawer/SectionSettingsDrawer.tsx';
import { BoardSettingsDrawer } from '@/features/boards/components/BoardSettingsDrawer/BoardSettingsDrawer.tsx';

type BoardProps = { boardId: BoardDto['id'] };

const BoardContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3> Loading... </h3>;

  return <Board boardId={boardId} />;
};

const Board = ({ boardId }: BoardProps) => {
  const { board, viewerList } = useBoardPage(boardId);

  // Patch Board Modal
  const [isPatchBoardOpen, setIsPatchBoardOpen] = useState(false);
  const openPatchBoard = () => setIsPatchBoardOpen(true);
  const closePatchBoard = () => setIsPatchBoardOpen(false);

  // Create Ticket Modal
  const [createTicketSectionId, setCreateTicketSectionId] = useState<
    SectionDto['id'] | null
  >(null);
  const openCreateTicket = (sectionId: SectionDto['id']) => {
    setCreateTicketSectionId(sectionId);
  };
  const closeCreateTicket = () => {
    setCreateTicketSectionId(null);
  };
  const allCollaborators = board ? [board.owner, ...board.collaborators] : [];

  // Create Section List Item
  const lastSectionId = board?.sections.at(-1)?.id ?? '';

  // Section Settings
  const [settingsDrawerData, setSettingsDrawerData] = useState<Pick<
    SectionDto,
    'id' | 'name'
  > | null>(null);
  const openSectionSettings = (
    id: SectionDto['id'],
    name: SectionDto['name']
  ) => {
    setSettingsDrawerData({ id, name });
  };
  const closeSectionSettings = () => {
    setSettingsDrawerData(null);
  };

  return (
    <div className="relative mx-2 mt-3 mb-3 flex flex-1 flex-col gap-2">
      {board && (
        <>
          {/* Board Data + controls */}
          <div className="block-primary flex w-full justify-between px-3 py-2">
            <h2>
              {board.name}
              <br />
              {board.description}
            </h2>
            <button
              className="button-primary h-fit shrink-0 rounded-full p-0.5"
              onClick={openPatchBoard}
            >
              <img src={settings} />
            </button>
          </div>

          {/* Presence Tracking */}
          <ul className="block-primary flex flex-col gap-1 px-3 py-2">
            <li>Viewers</li>
            {viewerList.map((viewer) => (
              <li key={viewer.id}>{viewer.name}</li>
            ))}
          </ul>

          {/* Section List */}
          <ol className="flex flex-1 gap-3 overflow-x-auto">
            {board.sections.map((section) => (
              <Section
                openCreateTicketModal={() => openCreateTicket(section.id)}
                openSectionSettings={() =>
                  openSectionSettings(section.id, section.name)
                }
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

          {/* Patch Board */}
          <BoardSettingsDrawer
            open={isPatchBoardOpen}
            closeDrawer={closePatchBoard}
            boardId={board.id}
            boardOwnerId={board.owner.id}
            boardCollaborators={board.collaborators}
            boardName={board.name}
            boardDescription={board.description}
          />

          {/* Section Settings drawer */}
          <AnimatePresence>
            {settingsDrawerData && (
              <SectionSettingsDrawer
                closeDrawer={closeSectionSettings}
                boardId={board.id}
                sectionId={settingsDrawerData.id}
                sectionName={settingsDrawerData.name}
              />
            )}
          </AnimatePresence>

          {/* Create Ticket */}
          {createTicketSectionId && (
            <CreateTicketModal
              open={createTicketSectionId !== null}
              closeModal={closeCreateTicket}
              boardId={board.id}
              sectionId={createTicketSectionId}
              collaborators={allCollaborators}
            />
          )}
        </>
      )}
    </div>
  );
};

export { BoardContainer as Board };

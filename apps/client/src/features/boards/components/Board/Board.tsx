import settings from '@/assets/icons/settings.svg';
import type { SectionDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useBoardOutletContext } from '@/features/boards/context/useBoardOutletContext.ts';
import { BoardContent } from '@/features/boards/components/BoardContent/BoardContent.tsx';
import { CreateTicketModal } from '@/features/tickets/components/CreateTicketModal/CreateTicketModal.tsx';
import { SectionSettingsDrawer } from '@/features/sections/components/SectionSettingsDrawer/SectionSettingsDrawer.tsx';
import { BoardSettingsDrawer } from '@/features/boards/components/BoardSettingsDrawer/BoardSettingsDrawer.tsx';

const Board = () => {
  const { board, viewerList } = useBoardOutletContext();

  // Patch Board Modal
  const [isPatchBoardOpen, setIsPatchBoardOpen] = useState(false);
  const openPatchBoard = () => setIsPatchBoardOpen(true);
  const closePatchBoard = () => setIsPatchBoardOpen(false);

  // Create Ticket Modal
  const [createTicketSectionId, setCreateTicketSectionId] = useState<
    SectionDto['id'] | null
  >(null);
  const openCreateTicket = (sectionId: SectionDto['id']): void =>
    setCreateTicketSectionId(sectionId);
  const closeCreateTicket = () => setCreateTicketSectionId(null);
  const allCollaborators = [board.owner, ...board.collaborators];

  // Section Settings
  const [settingsDrawerData, setSettingsDrawerData] = useState<Pick<
    SectionDto,
    'id' | 'name'
  > | null>(null);
  const openSectionSettings = (
    id: SectionDto['id'],
    name: SectionDto['name']
  ) => setSettingsDrawerData({ id, name });
  const closeSectionSettings = () => setSettingsDrawerData(null);

  return (
    <div className="relative mx-2 my-3 flex min-h-0 flex-1 flex-col gap-2">
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

      <BoardContent
        board={board}
        openCreateTicket={openCreateTicket}
        openSectionSettings={openSectionSettings}
      />

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
    </div>
  );
};

export { Board };

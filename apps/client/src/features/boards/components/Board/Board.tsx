import settings from '@/assets/icons/settings_white.svg';

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
    <div className="relative flex min-h-0 flex-1 flex-col gap-2">
      {/* Board Data + controls */}
      <div className="block-container-primary flex w-full flex-col justify-between p-1">
        <div className="block-primary-title flex items-center justify-between p-1.5">
          <h2 className="w-full text-center text-lg font-bold">{board.name}</h2>
          <button
            className="button-image rounded-full"
            onClick={openPatchBoard}
          >
            <img src={settings} />
          </button>
        </div>

        {/* Description, Viewer Count, Viewer List */}
        <section className="mt-1 grid w-full grid-cols-6 gap-2">
          <p className="block-primary col-span-3 h-20 w-full px-2 py-1 text-sm font-semibold">
            {board.description}
          </p>
          <div className="block-primary flex h-20 flex-col px-2 py-1">
            <div className="text-sm font-semibold">Viewer(s)</div>
            <div className="flex flex-1 items-center justify-center text-center text-lg font-bold">
              {viewerList.length}
            </div>
          </div>
          <ul className="block-primary col-span-2 flex h-20 w-full flex-col gap-1 overflow-y-auto px-2 py-1 text-sm font-semibold">
            {viewerList.map((viewer) => (
              <li key={viewer.id}>{viewer.name}</li>
            ))}
          </ul>
        </section>
      </div>

      <main className="flex-1">
        <BoardContent
          board={board}
          openCreateTicket={openCreateTicket}
          openSectionSettings={openSectionSettings}
        />
      </main>

      {/* Modals + Drawers */}
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

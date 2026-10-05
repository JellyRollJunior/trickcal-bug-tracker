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
      <div className="block-primary flex w-full flex-col justify-between p-1">
        <h2 className="block-primary-title p-2 text-center font-bold">
          {board.name}
        </h2>
        <p className="mt-1.5 p-2 text-sm">{board.description}</p>
      </div>

      {/* Widgets */}
      <section className="grid w-full grid-cols-3 gap-2">
        {/* Presence Tracking */}
        <div className="block-container-primary col-span-2 flex gap-2 p-1">
          <div className="block-primary flex flex-col items-center justify-center px-5 py-3">
            <div className="text-center text-lg font-bold">
              {viewerList.length}
            </div>
            <div className="text-center text-sm font-bold">Viewer(s)</div>
          </div>
          <ul className="block-primary flex max-h-20 w-full flex-col gap-1 overflow-y-auto px-3 py-1.5">
            {viewerList.map((viewer) => (
              <li key={viewer.id}>{viewer.name}</li>
            ))}
          </ul>
        </div>

        {/* Settings */}
        <div className="block-primary flex h-full w-full items-center justify-center">
          <button
            className="button-primary h-fit shrink-0 rounded-full p-2"
            onClick={openPatchBoard}
          >
            <img src={settings} />
          </button>
        </div>
      </section>

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

import type { SectionDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useBoardOutletContext } from '@/features/boards/context/useBoardOutletContext.ts';
import { BoardHeader } from '@/features/boards/components/BoardHeader/BoardHeader.tsx';
import { BoardContent } from '@/features/boards/components/BoardContent/BoardContent.tsx';
import { CreateTicketModal } from '@/features/tickets/components/CreateTicketModal/CreateTicketModal.tsx';
import { SectionSettingsDrawer } from '@/features/sections/components/SectionSettingsDrawer/SectionSettingsDrawer.tsx';
import { Spinner } from '@/common/components/Spinner.tsx';

const Board = () => {
  const { board, viewerList } = useBoardOutletContext();

  // Create Ticket Modal
  const [createTicketSectionId, setCreateTicketSectionId] = useState<
    SectionDto['id'] | null
  >(null);
  const openCreateTicket = (sectionId: SectionDto['id']): void => {
    setCreateTicketSectionId(sectionId);
  };
  const closeCreateTicket = () => setCreateTicketSectionId(null);

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
      <BoardHeader board={board} viewerList={viewerList} />

      <main className="flex min-h-0 flex-1">
        {board ? (
          <BoardContent
            board={board}
            openCreateTicket={openCreateTicket}
            openSectionSettings={openSectionSettings}
          />
        ) : (
          <div className="block-container-primary flex h-full min-h-0 w-full items-center justify-center">
            <Spinner className="h-10 w-10 border-2" />
          </div>
        )}
      </main>

      {/* Modals + Drawers */}
      {board && (
        <>
          {/* Section Settings drawer */}
          <AnimatePresence>
            {settingsDrawerData && (
              <SectionSettingsDrawer
                open={settingsDrawerData !== null}
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
              collaborators={[board.owner, ...board.collaborators]}
            />
          )}
        </>
      )}
    </div>
  );
};

export { Board };

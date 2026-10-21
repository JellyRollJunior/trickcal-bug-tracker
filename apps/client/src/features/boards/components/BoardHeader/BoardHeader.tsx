import settings from '@/assets/icons/settings_white.svg';

import type {
  BoardWithSectionsAndTicketsDto,
  UserDto,
} from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Spinner } from '@/common/components/Spinner.tsx';
import { BoardSettingsDrawer } from '@/features/boards/components/BoardSettingsDrawer/BoardSettingsDrawer.tsx';

type BoardHeaderProps = {
  board: BoardWithSectionsAndTicketsDto | null;
  viewerList: UserDto[] | null;
  isPendingGetBoard: boolean;
};
const BoardHeader = ({
  board,
  viewerList,
  isPendingGetBoard,
}: BoardHeaderProps) => {
  const [isPatchBoardOpen, setIsPatchBoardOpen] = useState(false);
  const openPatchBoard = () => setIsPatchBoardOpen(true);
  const closePatchBoard = () => setIsPatchBoardOpen(false);

  return (
    <>
      <div className="block-container-primary flex w-full flex-col justify-between p-1">
        <div className="block-primary-title flex items-center justify-between p-1.5">
          <h2 className="flex w-full items-center justify-center text-center text-lg font-bold">
            {board ? board.name : isPendingGetBoard ? <Spinner /> : ''}
          </h2>
          <button
            className="button-image rounded-full"
            onClick={openPatchBoard}
            aria-label="Board settings"
          >
            <img src={settings} />
          </button>
        </div>

        {/* Description, Viewer Count, Viewer List */}
        <section className="mt-1 grid w-full grid-cols-6 gap-2">
          <p className="block-primary col-span-3 h-20 w-full px-2 py-1 text-sm font-semibold">
            {board && board.description}
          </p>
          <div className="block-primary flex h-20 flex-col px-2 py-1">
            <div className="text-sm font-semibold">Viewer(s)</div>
            <div className="flex flex-1 items-center justify-center text-center text-lg font-bold">
              {viewerList && viewerList.length}
            </div>
          </div>
          <ul className="block-primary col-span-2 flex h-20 w-full flex-col gap-1 overflow-y-auto px-2 py-1 text-sm font-semibold">
            {viewerList &&
              viewerList.map((viewer) => (
                <li key={viewer.id}>{viewer.name}</li>
              ))}
          </ul>
        </section>
      </div>

      {/* Patch Board */}
      <AnimatePresence>
        {board && isPatchBoardOpen && (
          <BoardSettingsDrawer
            open={isPatchBoardOpen}
            closeDrawer={closePatchBoard}
            boardId={board.id}
            boardOwnerId={board.owner.id}
            boardCollaborators={board.collaborators}
            boardName={board.name}
            boardDescription={board.description}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export { BoardHeader };

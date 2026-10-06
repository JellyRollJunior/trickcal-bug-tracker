import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { AnimatePresence, motion } from 'motion/react';
import { useBoardSettingsDrawer } from '@/features/boards/components/BoardSettingsDrawer/useBoardSettingsDrawer.ts';
import { AddCollaboratorForm } from '@/features/boards/components/AddCollaboratorForm/AddCollaboratorForm.tsx';
import { DeleteCollaboratorForm } from '@/features/boards/components/DeleteCollaboratorForm/DeleteCollaboratorForm.tsx';
import { DeleteBoardButton } from '@/features/boards/components/DeleteBoardButton/DeleteBoardButton.tsx';

type BoardSettingsDrawerProps = {
  open: boolean;
  closeDrawer: () => void;
  boardId: BoardDto['id'];
  boardOwnerId: BoardDto['owner']['id'];
  boardCollaborators: BoardDto['collaborators'];
  boardName: BoardDto['name'];
  boardDescription: BoardDto['description'];
};
const BoardSettingsDrawer = ({
  open,
  closeDrawer,
  boardId,
  boardOwnerId,
  boardCollaborators,
  boardName,
  boardDescription,
}: BoardSettingsDrawerProps) => {
  const {
    newBoardName,
    setNewBoardName,
    newDescription,
    setNewDescription,
    reset,
    handlePatchBoard,
    isPendingPatchBoard,
    isOwner,
  } = useBoardSettingsDrawer(
    boardId,
    boardName,
    boardDescription,
    boardOwnerId,
    closeDrawer
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ translateX: '100%', opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: '100%', opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="block-primary absolute top-0 right-0 flex h-full min-w-1/3 flex-col gap-1.5 overflow-y-auto px-3 py-2"
        >
          <button
            className="absolute -top-1.5 right-1.5 h-fit text-2xl"
            onClick={() => {
              closeDrawer();
              reset();
            }}
          >
            ×
          </button>
          <h3 className="font-semibold">Board settings</h3>

          {/* Delete Board */}
          {isOwner && <DeleteBoardButton boardId={boardId} />}

          {/* Patch Board */}
          <hr className="mt-3 h-px border-0 bg-gray-300" />
          <form className="mt-3" onSubmit={handlePatchBoard}>
            <label htmlFor="newBoardName">Edit board name</label>
            <input
              className="block-primary mt-2 w-full py-1 pr-1 pl-2"
              id="newBoardName"
              minLength={1}
              maxLength={100}
              value={newBoardName}
              onChange={(event) => setNewBoardName(event.target.value)}
            />
            <label className="mt-2 block" htmlFor="newDescription">
              Edit description
            </label>
            <textarea
              className="block-primary w-full py-1 pr-1 pl-2"
              id="newDescription"
              rows={4}
              minLength={1}
              maxLength={2000}
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
            />
            <button
              className="button-primary mt-2 px-3 py-1 disabled:bg-gray-300"
              disabled={isPendingPatchBoard}
            >
              Save changes
            </button>
          </form>

          {isOwner && (
            <>
              {/* Add Board Collaborators */}
              <hr className="mt-3 h-px border-0 bg-gray-300" />
              <AddCollaboratorForm
                boardId={boardId}
                isDisabled={isPendingPatchBoard}
              />

              {/* Remove Board Collaborators */}
              <hr className="mt-3 h-px border-0 bg-gray-300" />
              <DeleteCollaboratorForm
                boardId={boardId}
                collaborators={boardCollaborators}
                isDisabled={isPendingPatchBoard}
              />
            </>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export { BoardSettingsDrawer };

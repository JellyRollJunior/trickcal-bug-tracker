import type { BoardDto, UserDto } from '@trickcal-bug-tracker/shared';
import { AnimatePresence, motion } from 'motion/react';
import { useBoardSettingsDrawer } from '@/features/boards/components/BoardSettingsDrawer/useBoardSettingsDrawer';

type BoardSettingsDrawerProps = {
  open: boolean;
  closeDrawer: () => void;
  boardId: BoardDto['id'];
  boardName: BoardDto['name'];
  boardDescription: BoardDto['description'];
};
const BoardSettingsDrawer = ({
  open,
  closeDrawer,
  boardId,
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
    potentialCollaborators,
    newCollaboratorId,
    setNewcollaboratorId,
    handlePostCollaborator,
    isPendingPostCollaborator,
  } = useBoardSettingsDrawer(boardId, closeDrawer);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ translateX: '100%', opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: '100%', opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="block-primary absolute top-0 right-0 flex h-full min-w-1/3 flex-col gap-1.5 px-3 py-2"
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
          <hr className="mt-3 h-px border-0 bg-gray-300" />

          {/* Patch Board */}
          <form className="mt-3" onSubmit={handlePatchBoard}>
            <label htmlFor="newBoardName">Edit board name</label>
            <input
              className="block-primary mt-2 w-full py-1 pr-1 pl-2"
              id="newBoardName"
              placeholder={boardName}
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
              placeholder={boardDescription}
              rows={4}
              minLength={1}
              maxLength={2000}
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
            />
            <button
              className="button-primary mt-2 px-3 py-1 disabled:bg-gray-300"
              disabled={isPendingPostCollaborator || isPendingPatchBoard}
            >
              Save changes
            </button>
          </form>
          <hr className="mt-3 h-px border-0 bg-gray-300" />

          {/* Add Board Collaborators */}
          <form className="mt-5" onSubmit={handlePostCollaborator}>
            <select
              className="block block-primary py-0.5 pr-1"
              value={newCollaboratorId}
              onChange={(event) =>
                setNewcollaboratorId(event.target.value as UserDto['id'])
              }
              required
            >
              <option value="" disabled>
                Select new collaborator
              </option>
              {potentialCollaborators &&
                potentialCollaborators.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>
            <button
              className="button-primary mt-2 px-3 py-1 disabled:bg-gray-300"
              disabled={isPendingPostCollaborator || isPendingPatchBoard}
            >
              Add collaborator
            </button>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export { BoardSettingsDrawer };

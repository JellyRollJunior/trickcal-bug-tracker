import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { Drawer } from '@/common/components/Drawer.tsx';
import { useBoardSettingsDrawer } from '@/features/boards/components/BoardSettingsDrawer/useBoardSettingsDrawer.ts';
import { AddCollaboratorForm } from '@/features/boards/components/AddCollaboratorForm/AddCollaboratorForm.tsx';
import { DeleteCollaboratorForm } from '@/features/boards/components/DeleteCollaboratorForm/DeleteCollaboratorForm.tsx';
import { DeleteBoardButton } from '@/features/boards/components/DeleteBoardButton/DeleteBoardButton.tsx';
import { SpinnerButton } from '@/common/components/Spinnerbutton.tsx';

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
    <Drawer
      open={open}
      closeDrawer={closeDrawer}
      reset={reset}
      title={'Board settings'}
    >
      {/* Delete Board */}
      {isOwner && (
        <div className="mt-1">
          <DeleteBoardButton boardId={boardId} />
        </div>
      )}

      {/* Patch Board */}
      <form
        className="block-primary mt-2 px-3 py-2"
        onSubmit={handlePatchBoard}
      >
        <label className="font-semibold" htmlFor="newBoardName">
          Edit board name
        </label>
        <input
          className="input"
          id="newBoardName"
          minLength={1}
          maxLength={100}
          value={newBoardName}
          onChange={(event) => setNewBoardName(event.target.value)}
        />
        <label className="mt-2 block font-semibold" htmlFor="newDescription">
          Edit description
        </label>
        <textarea
          className="input"
          id="newDescription"
          rows={4}
          minLength={1}
          maxLength={2000}
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
        />
        <SpinnerButton
          className="button-confirm mt-2"
          title="Save changes"
          isDisabled={isPendingPatchBoard}
          isLoading={isPendingPatchBoard}
        />
      </form>

      {isOwner && (
        <>
          {/* Add Board Collaborators */}
          <AddCollaboratorForm
            boardId={boardId}
            isDisabled={isPendingPatchBoard}
          />

          {/* Remove Board Collaborators */}
          <DeleteCollaboratorForm
            boardId={boardId}
            collaborators={boardCollaborators}
            isDisabled={isPendingPatchBoard}
          />
        </>
      )}
    </Drawer>
  );
};

export { BoardSettingsDrawer };

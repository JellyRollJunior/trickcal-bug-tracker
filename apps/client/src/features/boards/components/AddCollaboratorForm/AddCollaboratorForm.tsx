import type { BoardDto, UserDto } from '@trickcal-bug-tracker/shared';
import { useAddCollaboratorForm } from '@/features/boards/components/AddCollaboratorForm/useAddCollaboratorForm.ts';
import { SpinnerButton } from '@/common/components/Spinnerbutton.tsx';

const AddCollaboratorForm = ({
  boardId,
  isDisabled,
}: {
  boardId: BoardDto['id'];
  isDisabled: boolean;
}) => {
  const {
    potentialCollaborators,
    newCollaboratorId,
    setNewcollaboratorId,
    handlePostCollaborator,
    isPendingPostCollaborator,
  } = useAddCollaboratorForm(boardId);

  return (
    <form
      className="block-primary mt-2 px-3 py-2"
      onSubmit={handlePostCollaborator}
    >
      <label className="lock font-semibold" htmlFor="newCollaborator">
        Add collaborator
      </label>
      <select
        id="newCollaborator"
        className="block-primary block py-0.5 pr-1"
        value={newCollaboratorId}
        onChange={(event) =>
          setNewcollaboratorId(event.target.value as UserDto['id'])
        }
        required
      >
        <option value="" disabled>
          Select collaborator
        </option>
        {potentialCollaborators &&
          potentialCollaborators.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
      </select>
      <SpinnerButton
        className="button-confirm mt-3"
        title="Add collaborator"
        isDisabled={isPendingPostCollaborator || isDisabled}
        isLoading={isPendingPostCollaborator}
      />
    </form>
  );
};

export { AddCollaboratorForm };

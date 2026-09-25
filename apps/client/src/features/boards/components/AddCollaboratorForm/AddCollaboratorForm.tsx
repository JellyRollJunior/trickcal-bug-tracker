import type { BoardDto, UserDto } from '@trickcal-bug-tracker/shared';
import { useAddCollaboratorForm } from '@/features/boards/components/AddCollaboratorForm/useAddCollaboratorForm.ts';

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
    <form className="mt-5" onSubmit={handlePostCollaborator}>
      <select
        className="block-primary block py-0.5 pr-1"
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
        disabled={isPendingPostCollaborator || isDisabled}
      >
        Add collaborator
      </button>
    </form>
  );
};

export { AddCollaboratorForm };

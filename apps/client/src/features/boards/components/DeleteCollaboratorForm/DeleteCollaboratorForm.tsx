import type { BoardDto, UserDto } from '@trickcal-bug-tracker/shared';
import { useDeleteCollaboratorForm } from '@/features/boards/components/DeleteCollaboratorForm/useDeleteCollaboratorForm.ts';

const DeleteCollaboratorForm = ({
  boardId,
  collaborators,
  isDisabled,
}: {
  boardId: BoardDto['id'];
  collaborators: UserDto[];
  isDisabled: boolean;
}) => {
  const {
    deleteCollaboratorId,
    setDeleteCollaboratorId,
    handleDeleteCollaborator,
    isPendingDeleteCollaborator,
  } = useDeleteCollaboratorForm(boardId);

  return (
    <form className="mt-5" onSubmit={handleDeleteCollaborator}>
      <select
        className="block-primary block py-0.5 pr-1"
        value={deleteCollaboratorId}
        onChange={(event) =>
          setDeleteCollaboratorId(event.target.value as UserDto['id'])
        }
        required
      >
        <option value="" disabled>
          Select a collaborator
        </option>
        {collaborators.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button
        className="button-caution mt-2 px-3 py-1 disabled:bg-gray-300"
        disabled={isPendingDeleteCollaborator || isDisabled}
      >
        Remove collaborator
      </button>
    </form>
  );
};

export { DeleteCollaboratorForm };

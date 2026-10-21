import type { SubmitEvent } from 'react';
import { useCreateBoardForm } from '@/features/boards/components/CreateBoardForm/useCreateBoardForm.ts';
import { SpinnerButton } from '@/common/components/Spinnerbutton.tsx';

type CreateBoardFormProps = {
  onSubmitCleanup: () => void;
};
const CreateBoardForm = ({ onSubmitCleanup }: CreateBoardFormProps) => {
  const {
    boardName,
    setBoardName,
    description,
    setDescription,
    handlePostBoard,
    isPendingCreateBoard,
  } = useCreateBoardForm();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    handlePostBoard(event);
    onSubmitCleanup();
  };

  return (
    <form className="block-primary w-full px-3 py-2" onSubmit={handleSubmit}>
      <label className="font-semibold" htmlFor="BoardName">
        Board name
      </label>
      <input
        className="input"
        id="BoardName"
        minLength={1}
        maxLength={100}
        value={boardName}
        onChange={(event) => setBoardName(event.target.value)}
        required={true}
      />
      <label className="mt-2 block font-semibold" htmlFor="Description">
        Description
      </label>
      <textarea
        className="input"
        id="Description"
        rows={4}
        minLength={1}
        maxLength={2000}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required={true}
      />
      <SpinnerButton
        className="button-confirm mt-2 ml-auto block"
        title="Create board"
        isDisabled={isPendingCreateBoard}
        isLoading={isPendingCreateBoard}
      />
    </form>
  );
};

export { CreateBoardForm };

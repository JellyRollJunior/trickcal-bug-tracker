import { Link } from 'react-router-dom';
import { useBoards } from '@/features/boards/hooks/useBoards.ts';
import { CreateBoardForm } from '@/features/boards/components/CreateBoardForm/CreateBoardForm.tsx';

const BoardStartPage = () => {
  const { data: boards } = useBoards();

  return (
    <div className="max-h-lg flex w-full max-w-5xl gap-2 self-center justify-self-center">
      {/* Select Existing Board */}
      <section className="block-container-primary w-full max-w-lg overflow-y-auto">
        <div className="block-container-primary p-1">
          <h3 className="block-primary-title px-3 py-1 text-center text-xl font-semibold">
            Recent boards
          </h3>
          <ul className="mt-1 flex flex-col gap-1">
            {boards &&
              boards.map((board) => (
                <li key={board.id}>
                  <Link
                    to={`/boards/${board.id}`}
                    className="block-primary block px-3 py-2 dark:hover:brightness-90"
                  >
                    {board.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Create Board Prompt */}
      <section className="col-span-4 w-full max-w-lg self-center justify-self-center">
        <div className="block-container-primary p-1">
          <h2 className="block-primary-title px-3 py-1 text-center text-xl font-semibold">
            Create a new idea/bug tracking board
          </h2>
          <div className="mx-auto mt-1 w-full">
            <CreateBoardForm onSubmitCleanup={() => {}} />
          </div>
        </div>
      </section>
    </div>
  );
};

export { BoardStartPage };

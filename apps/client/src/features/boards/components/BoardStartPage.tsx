import { Link } from 'react-router-dom';
import { useBoards } from '@/features/boards/hooks/useBoards.ts';
import { CreateBoardButton } from '@/features/boards/components/CreateBoardButton/CreateBoardButton.tsx';

const BoardStartPage = () => {
  const { data: boards } = useBoards();

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto">
      {/* Create Board Prompt */}
      <section className="block-container-primary mt-20 flex w-full max-w-md items-center gap-1 p-1">
        <h3 className="block-primary-title w-full px-3 py-1 text-center text-xl font-semibold">
          Create a new idea/bug tracking board
        </h3>
        <div className="h-fit">
          <CreateBoardButton />
        </div>
      </section>

      {/* Select Existing Board */}
      <section className="block-container-primary mt-3 w-full max-w-md p-1">
        <h3 className="block-primary-title px-3 py-1 text-center text-xl font-semibold">
          Recent boards
        </h3>
        <ul className="mt-1 flex flex-col">
          {boards &&
            boards.map((board) => (
              <li key={board.id}>
                <Link
                  to={`/boards/${board.id}`}
                  className="select-primary-item block px-3 py-2"
                >
                  {board.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export { BoardStartPage };

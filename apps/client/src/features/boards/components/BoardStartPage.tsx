import { Link } from 'react-router-dom';
import { useBoards } from '@/features/boards/hooks/useBoards.ts';
import { CreateBoardButton } from '@/features/boards/components/CreateBoardButton/CreateBoardButton.tsx';

const BoardStartPage = () => {
  const { data: boards } = useBoards();

  return (
    <div className="grid grid-cols-3 overflow-y-auto">
      {/* Select Existing Board */}
      <section className="block-container-primary mt-3 w-full  p-1">
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
      </section>

      {/* Create Board Prompt */}
      <section className="flex w-full flex-col self-center items-center gap-3 col-span-2">
        <h2 className="text-hero text-center text-4xl font-bold">
          Create a new idea/bug tracking board
        </h2>

        <CreateBoardButton />
      </section>
    </div>
  );
};

export { BoardStartPage };

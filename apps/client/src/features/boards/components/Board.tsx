import type {
  BoardDto,
} from '@trickcal-bug-tracker/shared';
import { useParams } from 'react-router-dom';
import { useBoard } from '@/features/boards/hooks/useBoard.tsx';
import { Section } from '@/features/sections/components/Section.tsx';

type BoardProps = { boardId: BoardDto['id'] };

const BoardContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3> swag </h3>;

  return <Board boardId={boardId} />;
};

const Board = ({ boardId }: BoardProps) => {
  const { data: board, isSuccess, isPending } = useBoard(boardId);

  return (
    <div className="mx-2 mt-3 mb-3 flex flex-col gap-2">
      {board && isSuccess && !isPending && (
        <>
          <h2 className="block-primary w-fit px-3 py-2">{board.name}</h2>
          <div className="block-primary w-fit px-3 py-2">
            {board.description}
          </div>
          <ol className="flex gap-3 overflow-x-auto pb-5">
            {board.sections.map((section) => (
              <Section key={section.id} section={section} />
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export { BoardContainer as Board };

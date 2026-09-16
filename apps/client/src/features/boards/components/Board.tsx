import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useParams } from 'react-router-dom';
import { useBoard } from '@/features/boards/hooks/useBoard.tsx';

type BoardProps = { boardId: BoardDto['id'] };

const BoardContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3> swag </h3>;

  return <Board boardId={boardId} />;
};

const Board = ({ boardId }: BoardProps) => {
  const { data, isSuccess, isPending } = useBoard(boardId);

  return (
    <div className="w-md">
      <div>{boardId}</div>
      {data && isSuccess && !isPending && (
        <>
          <h2>{data.name}</h2>
          <h3>{data.description}</h3>
        </>
      )}
    </div>
  );
};

export { BoardContainer as Board };

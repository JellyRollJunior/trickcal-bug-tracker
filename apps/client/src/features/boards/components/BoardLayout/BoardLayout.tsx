import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { Outlet, useParams } from 'react-router-dom';
import { useBoardLayout } from '@/features/boards/components/BoardLayout/useBoardLayout.ts';
import type { BoardOutletContext } from '@/features/boards/context/useBoardOutletContext.ts';

const BoardLayoutContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3>Loading...</h3>;

  return <BoardLayout boardId={boardId} />;
};

type BoardLayoutProps = { boardId: BoardDto['id'] };
const BoardLayout = ({ boardId }: BoardLayoutProps) => {
  const { board, isPendingGetBoard, viewerList } = useBoardLayout(boardId);

  if (isPendingGetBoard || !board) return <h3>Loading...</h3>;

  const context: BoardOutletContext = { board, viewerList };

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1">
      <Outlet context={context} />
    </div>
  );
};

export { BoardLayoutContainer as BoardLayout };

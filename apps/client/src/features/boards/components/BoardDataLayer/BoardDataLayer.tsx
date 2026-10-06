import type { BoardDto } from '@trickcal-bug-tracker/shared';
import type { BoardOutletContext } from '@/features/boards/context/useBoardOutletContext.ts';
import { Outlet, useParams } from 'react-router-dom';
import { useBoardLayout } from '@/features/boards/components/BoardDataLayer/useBoardDataLayer.ts';

const BoardDataLayerContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3>Loading...</h3>;

  return <BoardDataLayer boardId={boardId} />;
};

type BoardDataLayerProps = { boardId: BoardDto['id'] };
const BoardDataLayer = ({ boardId }: BoardDataLayerProps) => {
  const { board, isPendingGetBoard, viewerList } = useBoardLayout(boardId);

  if (isPendingGetBoard || !board) return <h3>Loading...</h3>;

  const context: BoardOutletContext = { board, viewerList };

  return <Outlet context={context} />;
};

export { BoardDataLayerContainer as BoardDataLayer };

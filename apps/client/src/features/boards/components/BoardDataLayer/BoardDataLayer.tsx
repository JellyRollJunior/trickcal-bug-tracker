import type { BoardDto } from '@trickcal-bug-tracker/shared';
import type { BoardOutletContext } from '../../context/useBoardOutletContext';
import { useBoardDataLayer } from '@/features/boards/components/BoardDataLayer/useBoardDataLayer.ts';
import { Outlet, useParams } from 'react-router-dom';

const BoardDataLayerContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3>Loading...</h3>;

  return <BoardDataLayer boardId={boardId} />;
};

type BoardDataLayerProps = { boardId: BoardDto['id'] };
const BoardDataLayer = ({ boardId }: BoardDataLayerProps) => {
  const {
    board,
    isPendingGetBoard,
    isErrorGetBoard,
    viewerList,
    isDetailsOpen,
    toggleDetails,
  } = useBoardDataLayer(boardId);

  const context: BoardOutletContext = {
    board: board ?? null,
    isPendingGetBoard,
    isErrorGetBoard,
    viewerList,
    isDetailsOpen,
    toggleDetails,
  };

  return <Outlet context={context} />;
};

export { BoardDataLayerContainer as BoardDataLayer };

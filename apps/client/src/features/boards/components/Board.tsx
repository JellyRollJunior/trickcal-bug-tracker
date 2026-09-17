import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useParams } from 'react-router-dom';
import { useBoard } from '@/features/boards/hooks/useBoard.tsx';
import { useCreateSection } from '@/features/sections/hooks/useCreateSection.tsx';
import { Section } from '@/features/sections/components/Section.tsx';

type BoardProps = { boardId: BoardDto['id'] };

const BoardContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3> swag </h3>;

  return <Board boardId={boardId} />;
};

const Board = ({ boardId }: BoardProps) => {
  const {
    data: board,
    isSuccess: isSuccessGetBoard,
    isPending: isPendingGetBoard,
  } = useBoard(boardId);
  const {
    data: newSection,
    isSuccess: isSuccessCreateSection,
    isPending: isPendingCreateSection,
    isError: isErrorCreateSection,
  } = useCreateSection(boardId);

  return (
    <div className="mx-2 mt-3 mb-3 flex flex-col gap-2">
      {board && isSuccessGetBoard && !isPendingGetBoard && (
        <>
          <h2 className="block-primary w-fit px-3 py-2">{board.name}</h2>
          <div className="block-primary w-fit px-3 py-2">
            {board.description}
          </div>
          <ol className="flex gap-3 overflow-x-auto pb-5">
            {board.sections.map((section) => (
              <Section key={section.id} section={section} />
            ))}
            <div className="min-w-40 flex-1">
              <button
                className="block-primary flex justify-between px-3 py-2 disabled:bg-gray-300"
                disabled={isPendingCreateSection}
              >
                + New Section
              </button>
            </div>
          </ol>
        </>
      )}
    </div>
  );
};

export { BoardContainer as Board };

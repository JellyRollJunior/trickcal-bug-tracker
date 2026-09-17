import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useParams } from 'react-router-dom';
import { useBoard } from '@/features/boards/hooks/useBoard.tsx';
import { useCreateSection } from '@/features/sections/hooks/useCreateSection.tsx';
import { Section } from '@/features/sections/components/Section.tsx';
import { useState } from 'react';

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
  const { isPending: isPendingCreateSection } = useCreateSection(boardId);

  const [isCreateSectionOpen, setIsCreateSectionOpen] = useState(false);
  const openCreateSection = () => setIsCreateSectionOpen(true);
  const closeCreateSection = () => setIsCreateSectionOpen(false);

  return (
    <div className="mx-2 mt-3 mb-3 flex flex-col gap-2">
      {board && isSuccessGetBoard && !isPendingGetBoard && (
        <>
          <h2 className="block-primary w-fit px-3 py-2">{board.name}</h2>
          <div className="block-primary w-fit px-3 py-2">
            {board.description}
          </div>

          {/* Section List */}
          <ol className="flex gap-3 overflow-x-auto pb-5">
            {board.sections.map((section) => (
              <Section key={section.id} section={section} />
            ))}

            {/* Create Section */}
            {!isCreateSectionOpen && (
              <button
                className="block-primary flex h-fit min-w-40 flex-1 justify-between px-3 py-2 disabled:bg-gray-300"
                disabled={isPendingCreateSection}
                onClick={openCreateSection}
              >
                + New Section
              </button>
            )}
            {isCreateSectionOpen && (
              <form className="block-primary h-fit w-fit min-w-50 px-3 py-2">
                <input
                  className="block-primary w-full py-1 pr-1 pl-2"
                  type="text"
                  placeholder="Section name"
                />
                <div className="mt-2 flex justify-start gap-1">
                  <button
                    className="button-primary px-3 py-1 disabled:bg-gray-300"
                    disabled={isPendingCreateSection}
                  >
                    Create
                  </button>
                  <button
                    className="button-primary px-3 py-1 disabled:bg-gray-300"
                    type="button"
                    onClick={closeCreateSection}
                    disabled={isPendingCreateSection}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </ol>
        </>
      )}
    </div>
  );
};

export { BoardContainer as Board };

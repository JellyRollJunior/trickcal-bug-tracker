import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useEffect, useRef, useState } from 'react';
import { useCreateSectionListItem } from '@/features/sections/components/CreateSectionListItem/useCreateSectionListItem.ts';

type CreateSectionListItemProps = {
  boardId: BoardDto['id'];
  insertAfterSectionId: SectionDto['id'];
};
const CreateSectionListItem = ({
  boardId,
  insertAfterSectionId,
}: CreateSectionListItemProps) => {
  const {
    handleCreateSection,
    isPendingCreateSection,
    sectionName,
    setSectionName,
    reset,
  } = useCreateSectionListItem(boardId, insertAfterSectionId);

  const [isOpen, setIsOpen] = useState(false);
  const openCreateSection = () => setIsOpen(true);
  const closeCreateSection = () => {
    setIsOpen(false);
    reset();
  };

  const createSectionRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (isOpen) {
      createSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'end',
        block: 'nearest',
      });
    }
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          className="block-primary flex h-fit flex-1 justify-between py-2 pr-4 pl-3 text-nowrap disabled:bg-gray-300"
          disabled={isPendingCreateSection}
          onClick={openCreateSection}
        >
          + New Section
        </button>
      )}
      {isOpen && (
        <form
          ref={createSectionRef}
          className="block-primary h-fit w-fit px-3 py-2"
          onSubmit={(event) => {
            handleCreateSection(event);
            closeCreateSection();
          }}
        >
          <input
            className="block-primary w-full py-1 pr-1 pl-2"
            type="text"
            placeholder="Section name"
            minLength={1}
            maxLength={26}
            value={sectionName}
            onChange={(event) => setSectionName(event?.target.value)}
            required
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
    </>
  );
};

export { CreateSectionListItem }
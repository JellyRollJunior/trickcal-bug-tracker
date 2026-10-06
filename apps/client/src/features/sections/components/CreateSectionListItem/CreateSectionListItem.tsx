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
          className="button-floating h-fit rounded-md py-2 pr-4 pl-3 text-nowrap"
          disabled={isPendingCreateSection}
          onClick={openCreateSection}
        >
          + New Section
        </button>
      )}
      {isOpen && (
        <form
          ref={createSectionRef}
          className="block-container-primary h-fit w-fit px-3 py-2"
          onSubmit={(event) => {
            handleCreateSection(event);
            closeCreateSection();
          }}
        >
          <input
            className="input"
            type="text"
            placeholder="Section name"
            minLength={1}
            maxLength={26}
            value={sectionName}
            onChange={(event) => setSectionName(event?.target.value)}
            required
          />
          <div className="mt-2 flex justify-start gap-3">
            <button
              className="button-back"
              type="button"
              onClick={closeCreateSection}
              disabled={isPendingCreateSection}
            >
              Cancel
            </button>
            <button
              className="button-confirm"
              disabled={isPendingCreateSection}
            >
              Create
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export { CreateSectionListItem };

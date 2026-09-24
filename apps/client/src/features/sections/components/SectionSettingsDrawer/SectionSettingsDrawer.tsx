import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useSectionSettingsDrawer } from '@/features/sections/components/SectionSettingsDrawer/useSectionSettingsDrawer.ts';
import { CautionModal } from '@/common/components/CautionModal.tsx';

type SectionSettingsDrawerProps = {
  closeDrawer: () => void;
  boardId: BoardDto['id'];
  sectionId: SectionDto['id'];
  sectionName: SectionDto['name'];
};
const SectionSettingsDrawer = ({
  closeDrawer,
  boardId,
  sectionId,
  sectionName,
}: SectionSettingsDrawerProps) => {
  const {
    handleDeleteSection,
    isPendingDeleteSection,
    handlePatchSection,
    isPendingPatchSection,
    newName,
    setNewName,
    reset,
  } = useSectionSettingsDrawer(boardId, sectionId, closeDrawer);

  const [isDeleteSectionOpen, setIsDeleteSectionOpen] = useState(false);
  const openDeleteSection = () => setIsDeleteSectionOpen(true);
  const closeDeleteSection = () => setIsDeleteSectionOpen(false);

  return (
    <motion.aside
      initial={{ translateX: '100%', opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: '100%', opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="block-primary absolute top-0 right-0 flex h-full min-w-1/3 flex-col gap-1.5 px-3 py-2"
    >
      <button
        className="absolute -top-1.5 right-1.5 h-fit text-2xl"
        onClick={() => {
          closeDrawer();
          reset();
        }}
      >
        ×
      </button>
      <h3 className="font-semibold">Section settings</h3>

      {/* Delete Section */}
      <button
        className="button-caution w-fit px-1 py-0.5 text-xs"
        onClick={openDeleteSection}
        disabled={isPendingDeleteSection || isPendingPatchSection}
      >
        Remove section
      </button>
      <hr className="mt-3 h-px border-0 bg-gray-300" />

      {/* Patch Section */}
      <form className="mt-3" onSubmit={handlePatchSection}>
        <label htmlFor="newSectionName">Edit section name</label>
        <input
          className="block-primary mt-2 w-full py-1 pr-1 pl-2"
          id="newSectionName"
          placeholder={sectionName}
          type="text"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
        <button
          className="button-primary mt-2 px-3 py-1 disabled:bg-gray-300"
          disabled={isPendingDeleteSection || isPendingPatchSection}
        >
          Save changes
        </button>
      </form>

      {/* Delete Section Modal */}
      <CautionModal
        open={isDeleteSectionOpen}
        closeModal={closeDeleteSection}
        onSubmit={handleDeleteSection}
        isSubmitDisabled={isPendingDeleteSection}
        title="Are you sure you want to remove section?"
        submitActionLabel="Remove section"
      />
    </motion.aside>
  );
};

export { SectionSettingsDrawer };

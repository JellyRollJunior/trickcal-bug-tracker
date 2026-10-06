import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { useSectionSettingsDrawer } from '@/features/sections/components/SectionSettingsDrawer/useSectionSettingsDrawer.ts';
import { CautionModal } from '@/common/components/CautionModal.tsx';
import { Drawer } from '@/common/components/Drawer';

type SectionSettingsDrawerProps = {
  open: boolean;
  closeDrawer: () => void;
  boardId: BoardDto['id'];
  sectionId: SectionDto['id'];
  sectionName: SectionDto['name'];
};
const SectionSettingsDrawer = ({
  open,
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
    <Drawer
      open={open}
      closeDrawer={closeDrawer}
      reset={reset}
      title={'Board settings'}
    >
      {/* Delete Section */}
      <button
        className="button-caution mt-1 w-full rounded-md py-1 text-sm"
        onClick={openDeleteSection}
        disabled={isPendingDeleteSection || isPendingPatchSection}
      >
        Remove section
      </button>

      {/* Patch Section */}
      <form
        className="block-primary mt-2 px-3 py-2"
        onSubmit={handlePatchSection}
      >
        <label className="font-semibold" htmlFor="newSectionName">
          Edit section name
        </label>
        <input
          className="input-text block"
          id="newSectionName"
          minLength={1}
          maxLength={26}
          placeholder={sectionName}
          type="text"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
        <button
          className="button-confirm mt-2"
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
        title="Remove Section"
        message="Are you sure you want to remove section?"
        submitActionLabel="Remove section"
      />
    </Drawer>
  );
};

export { SectionSettingsDrawer };

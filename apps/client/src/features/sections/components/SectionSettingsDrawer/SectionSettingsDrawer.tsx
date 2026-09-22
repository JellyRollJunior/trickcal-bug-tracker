import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSectionSettingsDrawer } from '@/features/sections/components/SectionSettingsDrawer/useSectionSettingsDrawer.ts';
import { Modal } from '@/common/components/Modal.tsx';

type SectionSettingsDrawerProps = {
  open: boolean;
  closeDrawer: () => void;
  boardId: BoardDto['id'];
  sectionId: SectionDto['id'];
};
const SectionSettingsDrawer = ({
  open,
  closeDrawer,
  boardId,
  sectionId,
}: SectionSettingsDrawerProps) => {
  const { handleDeleteSection, isPendingDeleteSection } =
    useSectionSettingsDrawer(boardId, sectionId, closeDrawer);

  const [isDeleteSectionOpen, setIsDeleteSectionOpen] = useState(false);
  const openDeleteSection = () => setIsDeleteSectionOpen(true);
  const closeDeleteSection = () => setIsDeleteSectionOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ translateX: '100%', opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: '100%', opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="block-primary absolute top-0 right-0 flex h-screen min-w-1/3 flex-col gap-1.5 px-3 py-2"
        >
          <button
            className="absolute -top-1.5 right-1.5 h-fit text-2xl"
            onClick={closeDrawer}
          >
            ×
          </button>
          <h3 className="font-semibold">Section settings</h3>

          {/* Delete Section */}
          <button
            className="button-caution w-fit px-1 py-0.5 text-xs"
            onClick={openDeleteSection}
          >
            Remove section
          </button>
          <hr className="mt-3 h-px border-0 bg-gray-300" />
          <Modal
            open={isDeleteSectionOpen}
            closeModal={closeDeleteSection}
            title="Remove section"
          >
            <form onSubmit={handleDeleteSection}>
              <p className="mt-5 text-center text-sm">
                Are you sure you want to remove section?
              </p>
              <div className="mt-8 flex justify-end gap-3">
                <button
                  className="button-primary px-3 py-1"
                  type="button"
                  onClick={closeDeleteSection}
                >
                  Cancel
                </button>
                <button
                  className="button-caution px-3 py-1"
                  disabled={isPendingDeleteSection}
                >
                  Remove section
                </button>
              </div>
            </form>
          </Modal>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export { SectionSettingsDrawer };

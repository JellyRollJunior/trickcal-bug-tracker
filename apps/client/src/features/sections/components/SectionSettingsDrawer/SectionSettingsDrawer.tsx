import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { AnimatePresence, motion } from 'motion/react';

type SectionSettingsDrawerProps = {
  open: boolean;
  closeModal: () => void;
  boardId: BoardDto['id'];
  sectionId: SectionDto['id'];
};
const SectionSettingsDrawer = ({
  open,
  closeModal,
  boardId,
  sectionId,
}: SectionSettingsDrawerProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ translateX: '100%', opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ translateX: '100%', opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="block-primary absolute top-0 right-0 h-screen min-w-1/3 px-3 py-2"
        >
          <button
            className="absolute -top-1.5 right-1.5 h-fit text-2xl"
            onClick={closeModal}
          >
            ×
          </button>
          <h3 className="font-semibold">Section settings</h3>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export { SectionSettingsDrawer };

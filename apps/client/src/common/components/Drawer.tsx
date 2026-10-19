import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type DrawerProps = {
  open: boolean;
  closeDrawer: () => void;
  title: string;
  reset: () => void;
  children: ReactNode;
};
const Drawer = ({ open, closeDrawer, reset, title, children }: DrawerProps) => {
  return (
    <>
      {open && (
        <motion.aside
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="block-container-primary drawer absolute top-0 right-0 z-10 h-full min-w-1/3 overflow-y-auto p-1"
        >
          <div className="block-primary-title flex items-center justify-between p-1.5">
            <h3 className="w-full font-bold">{title}</h3>
            <button
              className="button-image h-7 w-7 rounded-full text-lg"
              onClick={() => {
                closeDrawer();
                reset();
              }}
            >
              ×
            </button>
          </div>
          {children}
        </motion.aside>
      )}
    </>
  );
};

export { Drawer };

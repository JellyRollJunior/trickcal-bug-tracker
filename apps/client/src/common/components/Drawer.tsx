import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type DrawerContainerProps = {
  open: boolean;
  closeDrawer: () => void;
  reset: () => void;
  title: string;
  children: ReactNode;
};
const DrawerContainer = ({
  open,
  closeDrawer,
  reset,
  title,
  children,
}: DrawerContainerProps) => {
  return (
    <AnimatePresence>
      {open && (
        <Drawer closeDrawer={closeDrawer} reset={reset} title={title}>
          {children}
        </Drawer>
      )}
    </AnimatePresence>
  );
};

type DrawerProps = {
  closeDrawer: () => void;
  title: string;
  reset: () => void;
  children: ReactNode;
};
const Drawer = ({ closeDrawer, reset, title, children }: DrawerProps) => {
  return (
    <motion.aside
      initial={{ translateX: '100%', opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: '100%', opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="block-container-primary drawer absolute top-0 right-0 h-full min-w-1/3 p-1 overflow-y-auto"
    >
      <div className="block-primary-title flex items-center justify-between p-1.5">
        <h3 className="w-full font-bold">{title}</h3>
        <button
        className="button-image text-lg h-7 w-7 rounded-full"
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
  );
};

export { DrawerContainer as Drawer };

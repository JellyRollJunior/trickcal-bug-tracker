import arrow_drop_down from '@/assets/icons/arrow_drop_down.svg';
import arrow_drop_down_white from '@/assets/icons/arrow_drop_down_white.svg';

import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useBoards } from '@/features/boards/hooks/useBoards.ts';
import { Spinner } from '@/common/components/Spinner.tsx';

const BoardsDropdown = () => {
  const { data, isSuccess, isPending } = useBoards();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  // Close on outside click / Escape
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        className={`select-primary w-full px-3 py-1 hover:brightness-95 ${
          isOpen ? 'rounded-t-md' : 'rounded-md'
        }`}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="flex">
          <span className="flex-1 text-center">Select board</span>
          <img
            className="block dark:hidden"
            src={arrow_drop_down}
            alt=""
            aria-hidden="true"
          />
          <img
            className="hidden dark:block"
            src={arrow_drop_down_white}
            alt=""
            aria-hidden="true"
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            className="select-primary absolute z-10 w-full overflow-hidden rounded-b-md border-t-0"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {isPending && (
              <div role="status" className="flex p-2">
                <Spinner />
                <span className="sr-only">Loading boards</span>
              </div>
            )}

            {isSuccess && data.length === 0 && (
              <p className="p-2">No boards yet</p>
            )}

            {isSuccess && data.length > 0 && (
              <nav aria-label="Boards" onClick={close}>
                <ul>
                  {data.map((board) => (
                    <li key={board.id}>
                      <Link
                        to={`/boards/${board.id}`}
                        className="select-primary-item block px-3 py-2"
                      >
                        {board.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { BoardsDropdown };

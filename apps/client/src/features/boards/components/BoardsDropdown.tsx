import arrow_drop_down from '@/assets/icons/arrow_drop_down.svg';
import arrow_drop_down_white from '@/assets/icons/arrow_drop_down_white.svg';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useBoards } from '@/features/boards/hooks/useBoards.ts';

const BoardsDropdown = () => {
  const { data, isSuccess, isPending } = useBoards();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div className="relative w-full">
        <button
          className={`select-primary w-full px-3 py-1 hover:brightness-95 ${isOpen ? 'rounded-t-md' : 'rounded-md'}`}
          onClick={toggleDropdown}
        >
          <div className="flex">
            <div className="flex-1">Select board</div>
            <img className="block dark:hidden" src={arrow_drop_down} aria-hidden={true} />
            <img className="hidden dark:block " src={arrow_drop_down_white} aria-hidden={true} />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && isSuccess && !isPending && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="select-primary absolute z-10 w-full overflow-hidden rounded-b-md border-t-0"
            >
              {data.map((board) => (
                <li key={board.id} onClick={toggleDropdown}>
                  <Link
                    to={`/boards/${board.id}`}
                    className="select-primary-item block px-3 py-2 hover:brightness-95"
                  >
                    {board.name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export { BoardsDropdown };

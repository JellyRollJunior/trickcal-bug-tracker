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
      <div className="relative w-md">
        <button
          className="border-sand-beige w-full rounded-md border-2 bg-white px-3 py-2"
          onClick={toggleDropdown}
        >
          Select board
        </button>

        <AnimatePresence>
          {isOpen && isSuccess && !isPending && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="border-sand-beige absolute w-full overflow-hidden rounded-b-md border-2 border-t-0 z-10 bg-white"
            >
              {data.map((board) => (
                <li
                  key={board.id}
                  className="px-3 py-2 hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  <Link to={`/boards/${board.id}`} className="block px-3 py-2">
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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useBoards } from '@/features/boards/hooks/useBoards.tsx';

const BoardsDropdown = () => {
  const { data, isSuccess } = useBoards();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          className="border-sand-beige mt-1 rounded-md border-2 bg-white px-3 py-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Select board
        </button>

        <div>
          <AnimatePresence>
            {isOpen && isSuccess && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="border-sand-beige overflow-hidden rounded-b-md border-2 border-t-0 bg-white"
              >
                {data.map((board) => (
                  <li key={board.id} className="px-3 py-2 hover:bg-gray-100">
                    <Link
                      to={`/boards/${board.id}`}
                      className="block px-3 py-2"
                    >
                      {board.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export { BoardsDropdown };

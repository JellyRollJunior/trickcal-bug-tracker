import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useBoards } from '@/features/boards/hooks/useBoards.tsx';

const BoardsDropdown = () => {
  const { data, isSuccess } = useBoards();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h1 className="text-xl font-bold text-white">hi guys</h1>

      <div className="relative">
        <button
          className="border-sand-beige mt-1 rounded-md border-2 bg-white px-3 py-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Select board
        </button>

        <div
          className={`overflow-hidden transition-all duration-200 ease-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
        >
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
                    {board.name}
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

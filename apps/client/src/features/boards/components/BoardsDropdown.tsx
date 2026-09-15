import { useBoards } from '../hooks/useBoards';

const BoardsDropdown = () => {
  const { data, isPending, isSuccess, isError, error } = useBoards();

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h1 className="text-xl font-bold text-white">hi guys</h1>
      <ul>
        {isSuccess &&
          data.map((board) => (
            <li className='border-2 border-black '>
              <a href={`/boards/${board.id}`}>
                {board.name}
                <br />
                {board.description}
              </a>
            </li>
          ))}
      </ul>
    </>
  );
};

export { BoardsDropdown };

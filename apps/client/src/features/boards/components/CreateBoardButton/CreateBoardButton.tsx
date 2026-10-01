import add from '@/assets/icons/add.svg';

const CreateBoardButton = () => {
  return (
    <>
      <button
        className="button-primary block-primary p-0.5"
      >
        <img src={add} />
      </button>
    </>
  );
};

export { CreateBoardButton };

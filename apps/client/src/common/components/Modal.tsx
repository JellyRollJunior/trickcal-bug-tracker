import { useRef, type ReactNode } from 'react';

type ModalProps = { open: boolean; title: string; children: ReactNode };
const Modal = ({ open = false, title, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const hideModal = () => ref.current?.close();

  return (
    <dialog className="xs:w-sm block-primary m-auto h-150 w-9/10" open={open}>
      <div className="flex h-full flex-col overflow-scroll px-3 pt-3 pb-2.5">
        <header className="relative pt-3.5 pb-1.5">
          <button
            className="absolute -top-1.5 right-1.5 h-fit text-2xl"
            onClick={hideModal}
          >
            ×
          </button>
          <h2 className=" text-center text-lg">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </dialog>
  );
};

export { Modal };

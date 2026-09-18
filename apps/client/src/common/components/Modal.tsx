import { useEffect, useRef, type ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  closeModal: () => void;
  title: string;
  children: ReactNode;
};
const Modal = ({ open, closeModal, title, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      className="xs:w-sm block-primary m-auto h-fit"
      ref={ref}
      onClick={(event) => {
        if (event.target === ref.current) closeModal();
      }}
    >
      <div className="flex h-full flex-col overflow-scroll px-3 pt-3 pb-2.5">
        <header className="relative pt-2.5 pb-1.5">
          <button
            className="absolute -top-1.5 right-1.5 h-fit text-2xl"
            onClick={closeModal}
          >
            ×
          </button>
          <h2 className="text-center text-lg">{title}</h2>
        </header>
        {children}
      </div>
    </dialog>
  );
};

export { Modal };

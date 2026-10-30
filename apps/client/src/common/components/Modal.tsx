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
      className="xs:w-sm block-container-primary m-auto h-fit backdrop:bg-black/35 backdrop:backdrop-blur-xs md:w-md"
      ref={ref}
      onClick={(event) => {
        if (event.target === ref.current) closeModal();
      }}
      onClose={closeModal}
    >
      <div className="flex h-full flex-col overflow-y-auto p-1">
        <div className="block-primary-title mb-2 flex items-center justify-between p-1.5 pl-2.5">
          <h3 className="w-full font-bold">{title}</h3>
          <button
            className="button-image h-7 w-7 rounded-full text-lg"
            onClick={closeModal}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export { Modal };

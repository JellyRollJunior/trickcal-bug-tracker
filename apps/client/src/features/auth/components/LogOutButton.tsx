import logoutIcon from '@/assets/icons/logout_white.svg';

import { useState } from 'react';
import { useAuth } from '@/context/auth/useAuth.ts';
import { CautionModal } from '@/common/components/CautionModal.tsx';

const LogOutButton = () => {
  const { logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className="button-image rounded-full"
        onClick={openModal}
        aria-label="Create board"
      >
        <img src={logoutIcon} />
      </button>

      <CautionModal
        open={isOpen}
        closeModal={closeModal}
        onSubmit={logOut}
        title="Log Out"
        message="Are you sure you wan to log out?"
        submitActionLabel="Log out"
        isSubmitDisabled={false}
        isLoading={false}
      />
    </>
  );
};

export { LogOutButton };

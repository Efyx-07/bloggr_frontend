import ModalSecondaryButton from '../Sharables/Buttons/ModalSecondaryButton';
import ModalPrimaryButton from '../Sharables/Buttons/ModalPrimaryButton';
import useLogoutAdmin from '@/hooks/useLogoutAdmin';
import { useEffect, useState } from 'react';
import './ModalLogout.css';

interface ModalLogoutProps {
  isModalLogoutOpen: boolean;
  toggleModal: () => void;
  toggleMenu: () => void;
}
export default function ModalLogout({
  isModalLogoutOpen,
  toggleModal,
  toggleMenu,
}: ModalLogoutProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const logoutAdmin = useLogoutAdmin();

  const logoutAdminAndCloseModals = () => {
    setIsLoading(true);
    setIsClicked(true);
    logoutAdmin();
    toggleModal();
    toggleMenu();
  };

  useEffect(() => {
    if (isModalLogoutOpen) {
      setIsLoading(false);
      setIsClicked(false);
    }
  }, [isModalLogoutOpen]);

  return (
    <div
      className={`
        modal-logout 
        transition-transform duration-200 ease 
        ${!isModalLogoutOpen ? 'translate-x-full' : 'translate-x-0'}
      `}
    >
      <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
      <div className="buttons-container justify-center">
        <ModalSecondaryButton
          type="button"
          name="Annuler"
          onClick={toggleModal}
        />
        <ModalPrimaryButton
          type="button"
          name="Confirmer"
          onClick={logoutAdminAndCloseModals}
          isLoading={isLoading}
          isClicked={isClicked}
        />
      </div>
    </div>
  );
}

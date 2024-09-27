import './ModalLogout.scss';
import ModalSecondaryButton from '../Sharables/Buttons/ModalSecondaryButton';
import ModalPrimaryButton from '../Sharables/Buttons/ModalPrimaryButton';
import useLogoutAdmin from '@/hooks/useLogoutAdmin';

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
  const logoutAdmin = useLogoutAdmin();

  const logoutAdminAndCloseModals = () => {
    logoutAdmin();
    toggleModal();
    toggleMenu();
  };

  return (
    <div className={`modal-logout ${!isModalLogoutOpen ? 'hidden-modal' : ''}`}>
      <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
      <div className="buttons-container">
        <ModalSecondaryButton
          type="button"
          name="Annuler"
          onClick={toggleModal}
        />
        <ModalPrimaryButton
          type="button"
          name="Confirmer"
          onClick={logoutAdminAndCloseModals}
        />
      </div>
    </div>
  );
}

import './ModalLogout.scss';
import ModalSecondaryButton from '../Sharables/Buttons/ModalSecondaryButton';
import ModalPrimaryButton from '../Sharables/Buttons/ModalPrimaryButton';

interface ModalLogoutProps {
  isModalLogoutOpen: boolean;
  toggleModal: () => void;
}
export default function ModalLogout({
  isModalLogoutOpen,
  toggleModal,
}: ModalLogoutProps) {
  return (
    <div className={`modal-logout ${!isModalLogoutOpen ? 'hidden' : ''}`}>
      <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
      <div className="buttons-container">
        <ModalSecondaryButton
          type="button"
          name="Annuler"
          onClick={toggleModal}
        />
        <ModalPrimaryButton type="button" name="Confirmer" onClick={() => {}} />
      </div>
    </div>
  );
}

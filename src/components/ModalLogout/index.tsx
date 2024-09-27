import './ModalLogout.scss';
import ModalSecondaryButton from '../Sharables/Buttons/ModalSecondaryButton';
import ModalPrimaryButton from '../Sharables/Buttons/ModalPrimaryButton';

export default function ModalLogout() {
  return (
    <div className="modal-logout">
      <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
      <div className="buttons-container">
        <ModalSecondaryButton type="button" name="Annuler" onClick={() => {}} />
        <ModalPrimaryButton type="button" name="Confirmer" onClick={() => {}} />
      </div>
    </div>
  );
}

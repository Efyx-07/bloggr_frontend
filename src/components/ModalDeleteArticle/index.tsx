import PrimaryButton from '../Sharables/Buttons/PrimaryButton';
import SecondaryButton from '../Sharables/Buttons/SecondaryButton';
import './ModalDeleteArticle.scss';

export default function ModalDeleteArticle() {
  return (
    <div className="modal-overlay">
      <div className="modal-delete-article">
        <div className="modal-head">
          <p>X</p>
        </div>
        <div className="text-container">
          <p>Etes-vous sûr de vouloir supprimer cet article ?</p>
          <h3>Article name</h3>
        </div>
        <div className="buttons-container">
          <SecondaryButton type="reset" name="Annuler" onClick={() => {}} />
          <PrimaryButton type="submit" name="Confirmer" />
        </div>
      </div>
    </div>
  );
}

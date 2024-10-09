import Button from '@/components/Sharables/Buttons/Button';

interface ErrorViewProps {
  closeModal: () => void;
}

export default function ErrorView({ closeModal }: ErrorViewProps) {
  return (
    <>
      <p>Une erreur est survenue, merci de rééssayer plus tard...</p>
      <div className="buttons-container">
        <Button
          addedClassName="button-medium primary"
          type="reset"
          name="Fermer"
          onClick={closeModal}
        />
      </div>
    </>
  );
}

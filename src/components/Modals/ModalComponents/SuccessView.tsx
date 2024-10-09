import Button from '@/components/Sharables/Buttons/Button';

interface SuccessViewProps {
  successMention: string;
  closeAndResetModal: () => void;
}

export default function SuccessView({
  successMention,
  closeAndResetModal,
}: SuccessViewProps) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: successMention }} />
      <div className="buttons-container">
        <Button
          addedClassName="button-medium primary"
          type="reset"
          name="Fermer"
          onClick={closeAndResetModal}
        />
      </div>
    </>
  );
}

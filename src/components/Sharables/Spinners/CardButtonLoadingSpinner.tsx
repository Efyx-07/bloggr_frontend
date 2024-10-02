import './CardButtonLoadingSpinner.scss';

export default function CardButtonLoadingSpinner() {
  return (
    <div className="card-button-loading-spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

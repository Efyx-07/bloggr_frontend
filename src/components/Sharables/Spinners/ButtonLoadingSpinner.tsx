import './ButtonLoadingSpinner.scss';

export default function ButtonLoadingSpinner() {
  return (
    <div className="button-loading-spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

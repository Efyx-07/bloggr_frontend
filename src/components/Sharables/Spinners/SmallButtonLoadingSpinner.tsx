import './SmallButtonLoadingSpinner.css';

export function SmallButtonLoadingSpinner() {
  return (
    <div className="small-button-loading-spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

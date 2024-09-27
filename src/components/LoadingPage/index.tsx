import './LoadingPage.scss';
import LoadingSpinner from '../Sharables/Spinners/LoadingSpinner';

export default function LoadingPage() {
  return (
    <div className="loading-page">
      <LoadingSpinner />
    </div>
  );
}

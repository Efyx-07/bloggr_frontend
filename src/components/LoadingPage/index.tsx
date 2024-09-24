import './LoadingPage.scss';
import LoadingSpinner from '../Sharables/Buttons/LoadingSpinner';

export default function LoadingPage() {
  return (
    <div className="loading-page">
      <LoadingSpinner />
    </div>
  );
}

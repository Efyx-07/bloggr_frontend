import './LoadingPage.scss';
import LoadingSpinner from '../Sharables/Spinners/LoadingSpinner';

interface LoadingPageProps {
  mention?: string;
}

export default function LoadingPage({ mention }: LoadingPageProps) {
  return (
    <div className="loading-page">
      <p className="loading-page-mention">{mention}</p>
      <LoadingSpinner />
    </div>
  );
}

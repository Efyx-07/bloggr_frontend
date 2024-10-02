import './FakeArticleCard.scss';
import LoadingSpinner from '../Sharables/Spinners/LoadingSpinner';

export default function FakeArticleCard() {
  return (
    <div className="fake-article-card">
      <LoadingSpinner />
    </div>
  );
}

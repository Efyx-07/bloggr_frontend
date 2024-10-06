import './FakeArticleForm.scss';
import LoadingSpinner from '../Sharables/Spinners/LoadingSpinner';

export default function FakeArticleForm() {
  return (
    <div className="fake-article-form">
      <LoadingSpinner className="large-ring" />
    </div>
  );
}

import LoadingSpinner from '../Sharables/Spinners/LoadingSpinner';

export default function SkeletonArticleCard() {
  return (
    <div className="w-full h-96 bg-black75 flex items-center justify-center">
      <LoadingSpinner className="large-ring" />
    </div>
  );
}

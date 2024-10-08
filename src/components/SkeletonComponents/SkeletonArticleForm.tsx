import LoadingSpinner from '../Sharables/Spinners/LoadingSpinner';

export default function SkeletonArticleForm() {
  return (
    <div
      className="
        w-full max-w-[50rem] h-[100dvh]
        bg-black75
        flex items-center justify-center
      "
    >
      <LoadingSpinner className="large-ring" />
    </div>
  );
}

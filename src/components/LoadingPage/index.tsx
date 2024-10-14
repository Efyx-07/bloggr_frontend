import LoadingSpinner from '../Sharables/Spinners/LoadingSpinner';

interface LoadingPageProps {
  mention?: string;
}

export default function LoadingPage({ mention }: LoadingPageProps) {
  return (
    <div
      className="absolute top-0 left-0 z-5 w-screen h-dvh bg-black text-whiteRelief
      flex flex-col justify-center items-center gap-4"
    >
      {mention ? <p>{mention}</p> : <LoadingSpinner className="large-ring" />}
    </div>
  );
}

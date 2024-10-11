import LoadingPage from '@/components/LoadingPage';
import usePageLoader from '@/hooks/usePageLoader';

interface WithPageLoaderProps {
  children: React.ReactNode;
  loadingPageMention: string;
}

// Wrappe chaque page de l'app et lui applique un chargement de transition
// Prend une props pour personnaliser la mention de chargement
// ===========================================================================================
export function WithPageLoader({
  children,
  loadingPageMention,
}: WithPageLoaderProps) {
  // Utilise le hook pour le chargement de la page
  const isContentVisible = usePageLoader();
  return (
    <>
      {isContentVisible ? (
        <>{children}</>
      ) : (
        <LoadingPage mention={loadingPageMention} />
      )}
    </>
  );
}

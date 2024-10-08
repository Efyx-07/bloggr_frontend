import { useEffect, useState } from 'react';
import { loadingPageDelay } from '@/config';

// Hook pour gèrer le chargement des pages avec le delay défini dans config.ts
// ===========================================================================================
export default function usePageLoader() {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  // Utilisation de useEffect pour éviter les effets de bords
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsContentVisible(true);
    }, loadingPageDelay);
    return () => clearTimeout(timeoutId);
  }, []);

  return isContentVisible;
}

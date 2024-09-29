// Stocke l'adresse du serveur provenant du .env
export const backendUrl: string | undefined =
  process.env.NEXT_PUBLIC_BACKEND_URL;

// Stocke le nom du site
export const siteName: string = 'Bloggr';

// Delay pour la transition entre les pages
export const loadingPageDelay: number = 500;

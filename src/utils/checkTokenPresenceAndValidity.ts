import { isTokenExpired } from './isTokenExpired';
import { AdminResponse } from '@/interfaces/admin.interface';

// Vérifie la présence et la vaildité d'un token dans le local-storage et renvoie un booléen
// Prend des paramètres optionnels selon l'utilisation de la fonction
// ================================================================================================
export function checkTokenPresenceAndValidity(): boolean {
  // Récupère le token dans le local-storage
  const token: AdminResponse['token'] | null = localStorage.getItem('token');
  // Si token absent ou expiré (vérification avec la fonction util isTokenExpired)
  if (!token || isTokenExpired(token)) return false;
  return true;
}

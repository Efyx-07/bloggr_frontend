import { jwtDecode } from 'jwt-decode';
import { AdminResponse } from '@/interfaces/admin.interface';

interface DecodedToken {
  exp: number;
}

// Vérifie la validité du token et renvoie un booléen
// ===========================================================================================
export function isTokenExpired(token: AdminResponse['token']): boolean {
  if (!token) return true;
  try {
    // Décode la partie payload du token avec jwtDecode
    const decodedToken = jwtDecode<DecodedToken>(token);
    // Convertit la date actuelle exprimée en ms en secondes
    const currentTime: number = Date.now() / 1000;
    // Vérifie si l'horodatage du token décodé est antérieur au temps actuel
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token: ', error);
    return true;
  }
}

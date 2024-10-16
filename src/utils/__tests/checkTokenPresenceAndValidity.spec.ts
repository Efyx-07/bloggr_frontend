import { isTokenExpired } from '../isTokenExpired';
import { checkTokenPresenceAndValidity } from '../checkTokenPresenceAndValidity';

// Mock des dépendances
jest.mock('../isTokenExpired', () => ({
  isTokenExpired: jest.fn(),
}));

// Mock pour localStorage
const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test de la fonction utilitaire checkTokenPresenceAndValidity
// ===========================================================================================
describe('checkTokenPresenceAndValidity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear(); // Nettoie localStorage avant chaque test
  });

  // Test si aucun token n'est présent dans le local storage
  it('should return false if token is not present in local storage', () => {
    const result = checkTokenPresenceAndValidity();
    expect(result).toBe(false);
  });

  // Test si un token est présent dans le local storage et valide
  it('should return true if token is present and valid', () => {
    localStorage.setItem('token', 'valid_token');
    (isTokenExpired as jest.Mock).mockReturnValue(false);
    const result = checkTokenPresenceAndValidity();
    expect(result).toBe(true);
  });

  // Test si un token est présent dans le local storage mais expiré
  it('should return false if token is present but expired', () => {
    localStorage.setItem('token', 'expired_token');
    (isTokenExpired as jest.Mock).mockReturnValue(true);
    const result = checkTokenPresenceAndValidity();
    expect(result).toBe(false);
  });
});

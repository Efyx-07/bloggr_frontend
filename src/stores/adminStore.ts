import { create } from 'zustand';
import { Admin } from '@/interfaces/admin.interface';

interface State {
  admin: Admin | null;
  token: Admin['token'];
  isLogged: boolean;
  setToken: (newToken: Admin['token']) => void;
  saveAdminDataInLocalStorage: () => void;
  setAdminData: (admin: Admin) => void;
  logoutAdmin: () => void;
  checkIsLoggedStatus: () => boolean;
}
const useAdminStore = create<State>((set, get) => ({
  admin: null,
  token: null,
  isLogged: false,
  setToken: (newToken) => {
    set({ token: newToken, isLogged: !!newToken });
    localStorage.setItem('token', newToken ?? '');
  },
  saveAdminDataInLocalStorage: () => {
    localStorage.setItem('admin', JSON.stringify(get().admin));
  },
  setAdminData: (admin) => {
    set({ admin, isLogged: true });
    get().saveAdminDataInLocalStorage();
  },
  logoutAdmin: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    set({ admin: null, token: null, isLogged: false });
  },
  // Ne s'éxécute que côté client !!!
  checkIsLoggedStatus: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  },
}));

export default useAdminStore;

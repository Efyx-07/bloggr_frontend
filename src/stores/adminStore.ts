import { create } from 'zustand';
import { Admin } from '@/interfaces/admin.interface';

interface State {
  admin: Admin | null;
  token: string | null;
  isLogged: boolean;
  setToken: (newToken: string | null) => void;
  saveAdminDataInLocalStorage: () => void;
  setAdminData: (admin: Admin) => void;
  logoutAdmin: () => void;
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
    set({ admin });
    get().saveAdminDataInLocalStorage();
  },
  logoutAdmin: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    set({ admin: null, token: null, isLogged: false });
  },
}));

export default useAdminStore;

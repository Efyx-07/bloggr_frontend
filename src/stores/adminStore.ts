import { create } from 'zustand';
import { Admin, AdminResponse } from '@/interfaces/admin.interface';

interface State {
  admin: Admin | null;
  token: AdminResponse['token'];
  isLogged: boolean;
  setToken: (newToken: AdminResponse['token']) => void;
  saveAdminDataInLocalStorage: () => void;
  setAdminData: (admin: AdminResponse) => void;
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
    set({ admin: admin.admin, token: admin.token , isLogged: true });
    get().saveAdminDataInLocalStorage();
  },
  logoutAdmin: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    set({ admin: null, token: null, isLogged: false });
  },
}));

export default useAdminStore;

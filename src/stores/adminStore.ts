import { create } from 'zustand';
import { Admin, AdminData } from '@/interfaces/admin.interface';

interface State {
  admin: AdminData['admin'] | null;
  token: string | null;
  isLogged: boolean;
  setToken: (newToken: string | null) => void;
  saveAdminDataInLocalStorage: () => void;
  setAdminData: (admin: AdminData['admin']) => void;
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
}));

export default useAdminStore;

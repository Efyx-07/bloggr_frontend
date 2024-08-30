import { create } from 'zustand';
import Admin from '@/interfaces/admin.interface';

interface State {
    admin: Admin | null;
    token: string | null;
    isLogged: boolean;

}
const useAdminStore = create<State>((set, get) => ({
    admin: null,
    token: null,
    isLogged: false,
}));

export default useAdminStore;
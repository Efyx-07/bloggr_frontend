import { useRouter } from 'next/navigation';
import useAdminStore from '@/stores/adminStore';

// Hook pour déconnecter l'Admin
// ===========================================================================================
export default function useLogoutAdmin() {
  const router = useRouter();
  const adminStore = useAdminStore();
  const logoutAdmin = () => {
    adminStore.logoutAdmin();
    router.push('/');
  };
  return logoutAdmin;
}

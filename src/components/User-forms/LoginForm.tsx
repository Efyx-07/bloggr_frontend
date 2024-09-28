'use client';

import '../../styles/UserForm.scss';
import { FormEvent, useState } from 'react';
import { Admin } from '@/interfaces/admin.interface';
import validateLoginData from '@/utils/validateLoginData';
import { login } from '@/services/admin.service';
import useAdminStore from '@/stores/adminStore';
import { useRouter } from 'next/navigation';
import InputField from '../Form-fields/InputField';
import PrimaryButton from '../Sharables/Buttons/PrimaryButton';
import ButtonLoadingSpinner from '../Sharables/Spinners/ButtonLoadingSpinner';

export default function LoginForm() {
  const [email, setEmail] = useState<Admin['email']>('');
  const [password, setPassword] = useState<Admin['password']>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const adminStore = useAdminStore();
  const router = useRouter();

  // Soumet le formulaire pour connexion de l'Admin
  // ===========================================================================================
  const handleAdminLogin = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateLoginData(email, password)) return;
    try {
      const result: Admin = await login(email, password);
      // Connecte l'admin avec le service, gère les datas et navigue vers la page articles
      adminStore.setAdminData(result);
      const token: Admin['token'] = result.token;
      if (token) localStorage.setItem('token', token);
      router.push('/articles');
    } catch (error) {
      console.error('Error while connecting: ', error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAdminLogin}>
      <InputField
        id="email"
        name="Email"
        label="Votre email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        name="Password"
        label="Votre mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="buttons-container">
        {isLoading ? (
          <ButtonLoadingSpinner />
        ) : (
          <PrimaryButton type="submit" name="Me connecter" />
        )}
      </div>
    </form>
  );
}

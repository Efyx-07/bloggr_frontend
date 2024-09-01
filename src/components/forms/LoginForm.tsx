'use client';

import './Form.scss';
import { FormEvent, useState } from 'react';
import { Admin } from '@/interfaces/admin.interface';
import validateLoginData from '@/utils/validateLoginData';
import { login } from '@/services/admin.service';
import useAdminStore from '@/stores/adminStore';
import { useRouter } from 'next/navigation';
import InputField from './InputField';
import FormButton from './FormButton';

export default function LoginForm() {
  const [email, setEmail] = useState<Admin['email']>('');
  const [password, setPassword] = useState<Admin['password']>('');
  const adminStore = useAdminStore();
  const router = useRouter();

  const handleAdminLogin = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!validateLoginData(email, password)) return;
    try {
      const adminData: Admin = await login(email, password);
      adminStore.setAdminData(adminData);
      const token: Admin['token'] = adminData.token;
      if (token) localStorage.setItem('token', token);
      router.push('/articles');
    } catch (error) {
      console.error('Error while connecting: ', error);
    }
  };

  return (
    <form onSubmit={handleAdminLogin}>
      <InputField
        name="Email"
        label="Votre email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        name="Password"
        label="Votre mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormButton type="submit" name="Me connecter" />
    </form>
  );
}

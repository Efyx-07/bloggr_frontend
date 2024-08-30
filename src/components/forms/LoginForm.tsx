'use client';

import { FormEvent, useState } from 'react';
import { Admin, AdminData } from '@/interfaces/admin.interface';
import validateLoginData from '@/utils/validateLoginData';
import { login } from '@/services/admin.service';
import useAdminStore from '@/stores/adminStore';
import InputField from './InputField';
import FormButton from './FormButton';

export default function LoginForm() {
  const [email, setEmail] = useState<Admin['email']>('');
  const [password, setPassword] = useState<Admin['password']>('');
  const adminStore = useAdminStore();

  const adminLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateLoginData(email, password)) return;
    try {
      const adminData: AdminData = await login(email, password);
      adminStore.setAdminData(adminData.admin);
      const token: string | undefined = adminData.token;
      if (token) localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error while connecting: ', error);
    }
  };

  return (
    <form onSubmit={adminLogin}>
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

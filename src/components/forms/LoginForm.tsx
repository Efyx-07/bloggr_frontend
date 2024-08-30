'use client';

import { FormEvent, useState } from 'react';
import Admin from '@/interfaces/admin.interface';
import validateLoginData from '@/utils/validateLoginData';
import { login } from '@/services/admin.service';
import InputField from './InputField';
import FormButton from './FormButton';

export default function LoginForm() {
  const [email, setEmail] = useState<Admin['email']>('');
  const [password, setPassword] = useState<Admin['password']>('');

  const adminLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    console.log('It works');
    e.preventDefault();
    if (!validateLoginData(email, password)) {
      return;
    }
    try {
      const data = await login(email, password);
      const token = data.token;
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

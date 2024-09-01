'use client';

import './Form.scss';
import { FormEvent, useState } from 'react';
import FormButton from './FormButton';
import InputField from './InputField';
import { Admin } from '@/interfaces/admin.interface';
import { updatePassword } from '@/services/update-password.service';
import useLogoutAdmin from '@/hooks/useLogoutAdmin';

export default function UpdatePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState<Admin['password']>('');
  const [newPassword, setNewPassword] = useState<Admin['password']>('');
  const logoutAdmin = useLogoutAdmin();

  const updateAdminPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Récupère le token du local storage et le décode pour récupérer adminId
    const token = localStorage.getItem('token');
    if (!token) return;
    const adminId: number = decodeTokenAndGetAdminId(token);

    console.log(currentPassword, newPassword, token, '...', adminId);

    try {
      await updatePassword(token, adminId, currentPassword, newPassword);
      logoutAdmin();
    } catch (error) {
      console.error('Error during updating password: ', error);
    }
  };

  // Fonction pour décoder le token et récuperer adminId
  const decodeTokenAndGetAdminId = (token: string) => {
    const tokenParts: string[] = token.split('.');
    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    const adminId: number = tokenPayload.adminId;
    return adminId;
  };

  return (
    <form onSubmit={updateAdminPassword}>
      <InputField
        name="currentPassword"
        label="Votre mot de passe actuel"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <InputField
        name="newPassword"
        label="Nouveau mot de passe"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <FormButton type="submit" name="Modifier" />
    </form>
  );
}

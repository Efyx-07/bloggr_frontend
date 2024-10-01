'use client';

import '../../styles/form.scss';
import { FormEvent, useState } from 'react';
import PrimaryButton from '../Sharables/Buttons/PrimaryButton';
import InputField from '../Form-fields/InputField';
import { Admin } from '@/interfaces/admin.interface';
import { updatePassword } from '@/services/update-password.service';
import useLogoutAdmin from '@/hooks/useLogoutAdmin';
import { decodeTokenAndGetAdminId } from '@/utils/decodeTokenAndGetAdminId';
import FormErrorAlert from '../Sharables/FormErrorAlert';

export default function UpdatePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState<Admin['password']>('');
  const [newPassword, setNewPassword] = useState<Admin['password']>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const logoutAdmin = useLogoutAdmin();

  // Soumet le formulaire pour mettre à jour le password
  // ===========================================================================================
  const updateAdminPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsClicked(true);
    // Récupère le token du local storage et le décode pour récupérer adminId
    const token = localStorage.getItem('token');
    if (!token) return;
    const adminId: number = decodeTokenAndGetAdminId(token);

    try {
      // Met à jour le password avec le service et déconnecte l'Admin
      await updatePassword(token, adminId, currentPassword, newPassword);
      logoutAdmin();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(true);
      setIsClicked(false);
      console.error('Error during updating password: ', error);
    }
  };

  // Reinitialise le formulaire en cas d'erreur
  // ===========================================================================================
  const handleResetForm = () => {
    setErrorMessage(false);
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <form onSubmit={updateAdminPassword}>
      <InputField
        id="current-password"
        name="currentPassword"
        label="Votre mot de passe actuel"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <InputField
        id="new-password"
        name="newPassword"
        label="Nouveau mot de passe"
        requirement="(au moins 8 car. dont: 1 maj., 1 min., 1chiffre, 1 car. spécial)"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      {errorMessage ? (
        <FormErrorAlert
          errorMention="Mot de passe invalide ou erreur serveur"
          onButtonClick={handleResetForm}
          buttonMention="Rééssayer"
        />
      ) : (
        <div className="buttons-container">
          <PrimaryButton
            type="submit"
            name="Modifier"
            isLoading={isLoading}
            isClicked={isClicked}
          />
        </div>
      )}
    </form>
  );
}

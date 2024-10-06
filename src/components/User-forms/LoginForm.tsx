'use client';

import { FormEvent, useState } from 'react';
import { Admin } from '@/interfaces/admin.interface';
import validateLoginData from '@/utils/validateLoginData';
import { login } from '@/services/admin.service';
import useAdminStore from '@/stores/adminStore';
import { useRouter } from 'next/navigation';
import InputField from '../Form-fields/InputField';
import PasswordField from '../Form-fields/PasswordField';
import Button from '../Sharables/Buttons/Button';
import FormErrorAlert from '../Sharables/FormErrorAlert';

export default function LoginForm() {
  const [email, setEmail] = useState<Admin['email']>('');
  const [password, setPassword] = useState<Admin['password']>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const adminStore = useAdminStore();
  const router = useRouter();

  // Gère la visibilité du mot de passe
  // ===========================================================================================
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  // Soumet le formulaire pour connexion de l'Admin
  // ===========================================================================================
  const handleAdminLogin = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setIsClicked(true);
    if (!validateLoginData(email, password)) return;
    try {
      // Connecte l'admin avec le service, gère les datas et navigue vers la page articles
      const result: Admin = await login(email, password);
      adminStore.setAdminData(result);
      const token: Admin['token'] = result.token;
      if (token) localStorage.setItem('token', token);
      router.push('/dashboard/articles');
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(true);
      setIsClicked(false);
      console.error('Error while connecting: ', error);
    }
  };

  // Reinitialise le formulaire en cas d'erreur
  // ===========================================================================================
  const handleResetForm = () => {
    setErrorMessage(false);
    setEmail('');
    setPassword('');
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
        required
      />
      <PasswordField
        id="password"
        name="Password"
        label="Votre mot de passe"
        type={isPasswordVisible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        onClick={togglePasswordVisibility}
        isPasswordVisible={isPasswordVisible}
      />
      {errorMessage ? (
        <FormErrorAlert
          errorMention="Identifiants invalides"
          onButtonClick={handleResetForm}
          buttonMention="Rééssayer"
        />
      ) : (
        <div className="buttons-container">
          <Button
            addedClassName="button-large primary"
            type="submit"
            name="Me connecter"
            isLoading={isLoading}
            isClicked={isClicked}
            primary
          />
        </div>
      )}
    </form>
  );
}

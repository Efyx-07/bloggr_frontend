import { Admin } from '@/interfaces/admin.interface';

const emailRegex: RegExp = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;
const passwordRegex: RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;

export default async function validateLoginData(
  email: Admin['email'],
  password: Admin['password'],
): Promise<boolean> {
  if (email && typeof password === 'string') {
    return emailRegex.test(email) && passwordRegex.test(password);
  }
  return false;
}

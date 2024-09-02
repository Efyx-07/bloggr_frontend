export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  success?: boolean;
  message?: string;
  token?: string | null;
}

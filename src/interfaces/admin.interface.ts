export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface AdminResponse {
  admin: Admin,
  success?: boolean;
  message?: string;
  token?: string | null;
}

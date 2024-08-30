export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AdminData {
  success: boolean;
  message: string;
  token: string;
  admin: {
    id: Admin['id'],
    email: Admin['email']
  }
}

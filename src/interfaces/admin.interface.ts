export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AdminData {
  success?: boolean;
  message?: string;
  token?: string;
  admin: {
    id: Admin['id'];
    email: Admin['email'];
    firstName: Admin['firstName'];
    lastName: Admin['lastName'];
  };
}

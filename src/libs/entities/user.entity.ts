export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  refreshToken: string;
}

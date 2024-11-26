export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  status: 'admin' | 'student' | 'faculty';
  isDeleted: string;
}

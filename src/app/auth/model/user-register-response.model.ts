export interface UserRegisterResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: number;
  lastSeenOn: Date;
}

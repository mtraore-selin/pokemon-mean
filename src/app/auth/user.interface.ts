import { Role } from './user.enum';

export type User = {
  username: string;
  role: Role;
};

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}

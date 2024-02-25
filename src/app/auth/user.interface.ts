import { Role } from './user.enum';

export type User = {
  username: string;
  role: Role;
};

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}

export interface IUser {
  username: string;
  password: string;
  role: string[];
}
export interface IUserMongo {
  password: string;
  roles: string[];
  username: string;
  __v: number;
  _id: string;
}

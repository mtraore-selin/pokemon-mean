import { Role } from 'src/modules/user/enum/role.enum';

type User = {
  username: string;
  role: Role;
};

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}

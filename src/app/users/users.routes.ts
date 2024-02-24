import { Routes } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';

export const USER_ROUTES: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: SigninComponent },
];

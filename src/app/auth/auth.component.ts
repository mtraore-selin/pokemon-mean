import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnDestroy {
  authService = inject(AuthService);
  private subscription: Subscription | undefined;
  private snackBar = inject(MatSnackBar);

  login() {
    this.subscription = this.authService
      .login({ username: 'Momo', password: 'MomoTest' })
      .subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
      });
  }

  logout() {
    this.authService.logout();
  }
  private onSuccess() {
    this.snackBar.open('User loggedin successfully!', '', { duration: 5000 });
  }

  private onError() {
    this.snackBar.open('Error login.', '', { duration: 10000 });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

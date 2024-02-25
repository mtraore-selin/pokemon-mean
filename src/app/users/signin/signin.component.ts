import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { HoverDialogDirective } from '../../shared/directives/hover-dialog.directive';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SharedModule, HoverDialogDirective],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signinForm: FormGroup;
  private snackBar = inject(MatSnackBar);
  private subscription: Subscription | undefined;
  private fb = inject(FormBuilder);
  authService = inject(AuthService);

  private router = inject(Router);

  constructor() {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin() {
    this.subscription = this.authService
      .login(this.signinForm.value)
      .subscribe({
        next: () => {
          this.onSuccess();
          this.router.navigate(['/pokemons']);
        },
        error: () => this.onError(),
      });
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

import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FormUtilsService } from '../../shared/form/form-utils.service';
import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../auth/user.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  formUtils = inject(FormUtilsService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);

  private router = inject(Router);

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.usersService
        .registerUser({ ...this.registerForm.value, roles: [Role.User] })
        .subscribe({
          next: () => {
            this.onSuccess();
            this.router.navigate(['users']);
          },
          error: () => this.onError(),
        });
    } else {
      this.formUtils.validateAllFormFields(this.registerForm);
    }
  }

  private onSuccess() {
    this.snackBar.open('user saved successfully!', '', { duration: 3000 });
  }

  private onError() {
    this.snackBar.open('Error saving user.', '', { duration: 10000 });
  }
}

// user-form.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserMongo } from '../../auth/user.interface';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-user-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UserFormComponent {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserMongo
  ) {
    this.form = this.formBuilder.group({
      username: [data.username, Validators.required],
      password: [data.password, Validators.required],
      roles: [data.roles, Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.valid) {
      const updatedUser = {
        username: this.form.value.username,
        password: this.form.value.password,
        roles: this.form.value.roles,
      };
      this.dialogRef.close(updatedUser);
    }
  }
}

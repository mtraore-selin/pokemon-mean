import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IUser, IUserMongo, User } from '../../auth/user.interface';
import { UsersService } from '../users.service';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from '../users-form/users-form.component';
import { RouterLink } from '@angular/router';
import { HidePasswordPipe } from '../../shared/pipes/hide-password.pipe';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  imports: [SharedModule, RouterLink, HidePasswordPipe],
})
export class UsersListComponent implements OnInit {
  users: IUser[] = [];
  displayedColumns: string[] = ['username', 'roles', 'password', 'actions'];

  constructor(private userService: UsersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  removeUser(user: User): void {
    this.userService.deleteUser(user.username).subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(user: IUserMongo): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update user
        this.userService.updateUser(user._id, result).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }
}

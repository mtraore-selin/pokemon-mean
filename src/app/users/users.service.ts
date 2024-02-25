import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { APP_SETTINGS } from '../app.settings';
import { IUser, IUserMongo } from '../auth/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = inject(APP_SETTINGS).apiUrl + '/user';
  private http = inject(HttpClient);

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      })
    );
  }

  getUserByUsername(username: string): Observable<IUser> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get<IUser>(url).pipe(
      catchError((error) => {
        console.error(`Error fetching user ${username}:`, error);
        return throwError(() => error);
      })
    );
  }

  updateUser(id: string, user: IUserMongo): Observable<IUserMongo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<IUserMongo>(url, user).pipe(
      tap((updatedUser) => {
        console.log('User updated:');
      }),
      catchError((error) => {
        console.error(`Error updating user ${user.username}:`, error);
        return throwError(() => error);
      })
    );
  }

  deleteUser(username: string): Observable<void> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        console.log('User deleted:', username);
      }),
      catchError((error) => {
        console.error(`Error deleting user ${username}:`, error);
        return throwError(() => error);
      })
    );
  }

  registerUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user).pipe(
      tap((newUser) => {
        console.log('User registered:');
      }),
      catchError((error) => {
        console.error('Error registering user:', error);
        return throwError(() => error);
      })
    );
  }
}

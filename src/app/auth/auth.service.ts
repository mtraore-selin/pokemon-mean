import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

import { IAuthenticate } from './user.interface';
import { APP_SETTINGS } from '../app.settings';
import { Role } from './user.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private authUrl = inject(APP_SETTINGS).apiUrl + '/auth';

  private accessToken = signal('');
  private currentUser: IAuthenticate | null = null;

  isLoggedIn = computed(() => this.accessToken() !== '');

  login(authPayload: {
    username: string;
    password: string;
  }): Observable<IAuthenticate> {
    return this.http.post<IAuthenticate>(`${this.authUrl}`, authPayload).pipe(
      tap((response: IAuthenticate) => {
        this.accessToken.update(() => response.token);
        this.currentUser = response;
      }),
      catchError((error: any) => {
        console.log(error);
        throw error;
      })
    );
  }

  isAdmin(): boolean {
    return this.currentUser?.user.role === Role.Admin;
  }
  getCurrentUser(): IAuthenticate | null {
    return this.currentUser;
  }
  getAccessToken(): string | null {
    return this.accessToken();
  }
  logout() {
    this.accessToken.update(() => '');
    this.currentUser = null;
  }
}

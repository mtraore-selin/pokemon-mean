import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private accessToken = signal('');
  private authUrl = '/auth';

  isLoggedIn = computed(() => this.accessToken() !== '');

  login(username: string, password: string): Observable<string> {
    return this.http
      .post<string>(this.authUrl + '/login', {
        username,
        password,
      })
      .pipe(tap((token) => this.accessToken.update(() => token)));
  }

  logout() {
    this.accessToken.update(() => '');
  }
}

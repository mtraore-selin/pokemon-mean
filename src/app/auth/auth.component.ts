import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  authService = inject(AuthService);

  login() {
    this.authService.login('Mohamed', '2024*#39').subscribe();
  }

  logout() {
    this.authService.logout();
  }
}

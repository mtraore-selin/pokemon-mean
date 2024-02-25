import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthComponent } from '../../auth/auth.component';
import { AuthService } from '../../auth/auth.service';
import { APP_SETTINGS } from '../../app.settings';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, RouterLink, AsyncPipe, AuthComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  title: string = inject(APP_SETTINGS).title;
}

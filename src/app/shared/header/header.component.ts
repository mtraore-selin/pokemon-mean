import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthComponent } from '../../auth/auth.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    AsyncPipe,
    AuthComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}

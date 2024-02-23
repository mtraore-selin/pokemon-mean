import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatToolbarModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ng-pokemon';
}

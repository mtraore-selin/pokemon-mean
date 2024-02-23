import { Component } from '@angular/core';
import { CopyrightDirective } from '../directives/copyright.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CopyrightDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}

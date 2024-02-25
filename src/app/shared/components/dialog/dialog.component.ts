import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}
}

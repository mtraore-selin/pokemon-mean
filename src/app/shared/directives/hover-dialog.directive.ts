import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Directive({
  selector: '[appHoverDialog]',
  standalone: true,
})
export class HoverDialogDirective {
  private timeoutId: any;

  constructor(private dialog: MatDialog) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.timeoutId = setTimeout(() => {
      this.dialog.open(DialogComponent, {
        data: {
          content: 'Username: Momo, password: MomoTest',
        },
      });
    }, 500);
  }

  @HostListener('mouseleave') onMouseLeave() {
    clearTimeout(this.timeoutId);
  }
}

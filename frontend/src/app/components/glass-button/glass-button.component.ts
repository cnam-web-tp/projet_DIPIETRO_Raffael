import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-glass-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './glass-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlassButtonComponent {
  @Input() declare label: string;
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, TuiMoneyModule, TuiButtonModule],
  templateUrl: './cart-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartSummaryComponent {
  @Input() declare total: number;
  @Input() taxes = 0.2;
  @Input() shipping = 10;

  passTheCommand() {
    window.open('https://www.youtube.com/watch?v=JobTfCE2eS8', '_blank');
  }
}

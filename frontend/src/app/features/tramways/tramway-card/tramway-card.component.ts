import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject
} from '@angular/core';
import { Store } from '@ngxs/store';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { Tram } from '../../../models/tram.type';
import { environment } from '../../../../environments/environment';
import { AddTramToCart } from '../../../state/cart/cart.actions';

@Component({
  selector: 'app-tram-card',
  standalone: true,
  imports: [CommonModule, TuiMoneyModule],
  templateUrl: './tramway-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TramwayCardComponent {
  @Input() declare tram: Tram;

  private readonly store = inject(Store);

  imageBaseUrl = `${environment.API_URL}/images/trams`;

  addToCart(): void {
    this.store.dispatch(new AddTramToCart(this.tram));
  }
}

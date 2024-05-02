import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject
} from '@angular/core';
import { Store } from '@ngxs/store';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { Tramway } from '../../../models/tramway.type';
import { environment } from '../../../../environments/environment';
import { AddTramToCart } from '../../../state/cart/cart.actions';
import { tramwayImageUrl } from '../../../utils/tramway-image-url';

@Component({
  selector: 'app-tram-card',
  standalone: true,
  imports: [CommonModule, TuiMoneyModule],
  templateUrl: './tramway-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TramwayCardComponent {
  @Input() declare tram: Tramway;

  private readonly store = inject(Store);

  tramwayImageUrl = tramwayImageUrl;
}

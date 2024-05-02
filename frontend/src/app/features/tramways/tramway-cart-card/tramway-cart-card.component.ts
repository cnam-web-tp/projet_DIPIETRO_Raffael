import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tramway } from '../../../models/tramway.type';
import { tramwayImageUrl } from '../../../utils/tramway-image-url';

@Component({
  selector: 'app-tramway-cart-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tramway-cart-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TramwayCartCardComponent {
  @Input() declare tramway: Tramway;

  tramwayImageUrl = tramwayImageUrl;
}

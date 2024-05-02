import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState, TramInCart } from '../../../state/cart/cart.state';
import {
  AddTramToCart,
  ClearCart,
  DeleteTramFromCart,
  DecreaseTramCount,
  IncreaseTramCount
} from '../../../state/cart/cart.actions';
import { TramwayCartCardComponent } from '../../tramways/tramway-cart-card/tramway-cart-card.component';
import { TramwayCardComponent } from '../../tramways/tramway-card/tramway-card.component';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, TramwayCardComponent, TuiButtonModule, TuiSvgModule],
  templateUrl: './cart-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {
  private readonly store = inject(Store);

  cart$: Observable<TramInCart[]> = this.store.select((state) => state.cart);

  @Select(CartState.getCartTrams) declare tramsInCart$: Observable<
    TramInCart[]
  >;

  delete(tram: TramInCart): void {
    this.store.dispatch(new DeleteTramFromCart(tram.model));
  }

  increase(tram: TramInCart): void {
    this.store.dispatch(new IncreaseTramCount(tram.model));
  }

  decrease(tram: TramInCart): void {
    this.store.dispatch(new DecreaseTramCount(tram.model));
  }

  clearCart(): void {
    this.store.dispatch(new ClearCart());
  }
}

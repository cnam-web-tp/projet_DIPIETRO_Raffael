import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState, TramInCart } from '../../../state/cart/cart.state';
import {
  ClearCart,
  DeleteTramFromCart
} from '../../../state/cart/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {
  private readonly store = inject(Store);

  cart$: Observable<TramInCart[]> = this.store.select((state) => state.cart);

  @Select(CartState.getCartTrams) declare tramsInCart$: Observable<
    TramInCart[]
  >;

  deleteFromCart(tram: TramInCart): void {
    this.store.dispatch(new DeleteTramFromCart(tram.model));
  }

  clearCart(): void {
    this.store.dispatch(new ClearCart());
  }
}

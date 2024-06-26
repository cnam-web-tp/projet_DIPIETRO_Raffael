import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
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
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    TramwayCardComponent,
    TuiButtonModule,
    TuiSvgModule,
    CartSummaryComponent,
    RouterLink
  ],
  templateUrl: './cart-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {
  private readonly store = inject(Store);
  cart$: Observable<TramInCart[]> = this.store.select((state) => state.cart);

  @Select(CartState.getCartTrams) declare tramsInCart$: Observable<
    TramInCart[]
  >;

  @Select(CartState.getCartTotal) declare total$: Observable<number>;

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

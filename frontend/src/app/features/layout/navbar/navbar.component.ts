import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { TuiButtonModule } from '@taiga-ui/core';
import { Observable, map } from 'rxjs';
import { CartState } from '../../../state/cart/cart.state';
import { TokenService } from '../../authentication/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, RouterLink],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  readonly authenticationService = inject(TokenService);
  isAuthenticated$ = this.authenticationService.jwt$.pipe(map((jwt) => !!jwt));

  @Select(CartState.getCartTramsCount)
  declare cartTramsCount$: Observable<number>;
}

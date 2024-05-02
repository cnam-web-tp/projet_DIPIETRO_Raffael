import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { TramsService } from '../trams.service';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';
import { Tramway } from '../../../models/tramway.type';
import { SearchbarComponent } from '../../../components/searchbar/searchbar.component';
import { SearchbarService } from '../../../components/searchbar/searchbar.service';
import { TramwayCardComponent } from '../tramway-card/tramway-card.component';
import { Store } from '@ngxs/store';
import { AddTramToCart } from '../../../state/cart/cart.actions';
import { GlassButtonComponent } from '../../../components/glass-button/glass-button.component';

@Component({
  selector: 'app-tramways-page',
  standalone: true,
  imports: [
    CommonModule,
    TramwayCardComponent,
    SearchbarComponent,
    GlassButtonComponent
  ],
  providers: [SearchbarService],
  templateUrl: './tramways-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TramwaysPageComponent implements OnInit {
  declare trams$: Observable<Tramway[]>;

  tramsService = inject(TramsService);
  searchbarService = inject(SearchbarService);
  store = inject(Store);

  ngOnInit() {
    this.trams$ = this.searchbarService.getSearch$().pipe(
      startWith(),
      debounceTime(300),
      switchMap((search) => this.tramsService.searchTrams(search.text))
    );
  }

  addToCart(tramway: Tramway): void {
    this.store.dispatch(new AddTramToCart(tramway));
  }
}

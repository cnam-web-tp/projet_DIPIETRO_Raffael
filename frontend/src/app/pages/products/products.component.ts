import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { TramsService } from './trams.service';
import {
  Observable,
  combineLatest,
  debounceTime,
  map,
  startWith,
  switchMap
} from 'rxjs';
import { Tram } from '../../models/tram.type';
import { TramCardComponent } from '../../components/tramCard/tramCard.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { SearchbarService } from '../../components/searchbar/searchbar.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TramCardComponent, SearchbarComponent],
  providers: [SearchbarService],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  declare trams$: Observable<Tram[]>;

  tramsService = inject(TramsService);
  searchbarService = inject(SearchbarService);

  ngOnInit() {
    this.trams$ = this.searchbarService.getSearch$().pipe(
      startWith(),
      debounceTime(300),
      switchMap((search) => this.tramsService.searchTrams(search.text))
    );
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { TramsService } from '../trams.service';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';
import { Tram } from '../../../models/tram.type';
import { SearchbarComponent } from '../../../components/searchbar/searchbar.component';
import { SearchbarService } from '../../../components/searchbar/searchbar.service';
import { TramwayCardComponent } from '../tramway-card/tramway-card.component';

@Component({
  selector: 'app-tramways-page',
  standalone: true,
  imports: [CommonModule, TramwayCardComponent, SearchbarComponent],
  providers: [SearchbarService],
  templateUrl: './tramways-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TramwaysPageComponent implements OnInit {
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

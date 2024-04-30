import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { SearchbarService } from './searchbar.service';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiInputModule],
  templateUrl: './searchbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchbarComponent {
  @Input() searchbarLabel = 'Ecrivez pour rechercher';

  readonly searchForm = new FormGroup({
    text: new FormControl('')
  });

  searchBarService = inject(SearchbarService);

  constructor() {
    this.searchBarService.setSearch(
      this.searchForm.valueChanges.pipe(
        map((value) => ({
          text: value.text || ''
        }))
      )
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { Search } from '../../models/search.type';

@Injectable()
export class SearchbarService {
  constructor() {}

  private declare search$: Observable<Search>;

  getSearch$() {
    return this.search$.pipe(startWith({ text: '' }));
  }

  setSearch(text$: Observable<Search>) {
    this.search$ = text$;
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tramway } from '../../models/tramway.type';
import { Search } from '../../models/search.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TramsService {
  httpClient = inject(HttpClient);

  isTramMatchingSearch(tram: Tramway, search: Search): boolean {
    return tram.name.toLowerCase().includes(search.text.toLowerCase());
  }

  searchTrams(search?: string): Observable<Tramway[]> {
    return this.httpClient.get<Tramway[]>(
      `${environment.API_URL}/products/search`,
      {
        params: {
          ...(search ? { search } : '')
        }
      }
    );
  }
}

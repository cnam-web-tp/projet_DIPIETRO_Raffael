import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly jwtSubject$ = new BehaviorSubject<string | null>(null);
  private readonly userNameSubject$ = new BehaviorSubject<string | null>(null);
  jwt$ = this.jwtSubject$.asObservable();
  userName$ = this.userNameSubject$.asObservable();

  setToken(token: string, userName: string) {
    this.jwtSubject$.next(token);
    this.userNameSubject$.next(userName);
  }

  get userName(): string | null {
    return this.userNameSubject$.getValue();
  }

  get jwt(): string | null {
    return this.jwtSubject$.getValue();
  }
}

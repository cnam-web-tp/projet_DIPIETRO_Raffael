import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly jwtSubject$ = new BehaviorSubject<string | null>(null);
  private readonly userNameSubject$ = new BehaviorSubject<string | null>(null);
  jwt$ = this.jwtSubject$.asObservable();
  userName$ = this.userNameSubject$.asObservable();

  authenticateUser(token: string, login: string) {
    this.jwtSubject$.next(token);
    this.userNameSubject$.next(login);
  }

  get userName(): string | null {
    return this.userNameSubject$.getValue();
  }

  get jwt(): string | null {
    return this.jwtSubject$.getValue();
  }
}

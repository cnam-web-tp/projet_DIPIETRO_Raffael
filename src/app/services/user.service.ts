import { Injectable, inject } from '@angular/core';
import { CreateUser } from '../models/create-user.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginUserRequest } from '../models/login-user-request';
import { Observable } from 'rxjs';
import { LoginUserResponse } from '../models/login-user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient = inject(HttpClient);

  registerUser(user: CreateUser) {
    return this.httpClient.post(`${environment.API_URL}/auth/register`, user);
  }

  loginUser(user: LoginUserRequest): Observable<LoginUserResponse> {
    return this.httpClient.post<LoginUserResponse>(
      `${environment.API_URL}/auth/login`,
      user
    );
  }
}

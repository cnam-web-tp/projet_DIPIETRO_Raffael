import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authenticationService = inject(AuthenticationService);

  const jwt = authenticationService.jwt;

  if (!jwt) {
    return next(request);
  }

  const newRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${jwt}`
    }
  });

  return next(newRequest);
};

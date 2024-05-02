import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../features/authentication/token.service';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authenticationService = inject(TokenService);

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

import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule
} from '@taiga-ui/kit';
import { CustomValidators } from '../../components/user-form/customValidators';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
    TuiInputPasswordModule
  ],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Ce champ est obligatoire'
      }
    }
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  userService = inject(UserService);
  authenticationService = inject(AuthenticationService);
  router = inject(Router);

  loginForm = new FormGroup({
    login: new FormControl('', [CustomValidators.required]),
    password: new FormControl('', [CustomValidators.required])
  });

  errorMessage$ = new BehaviorSubject<string | null>(null);

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    if (!this.loginForm.value.login || !this.loginForm.value.password) {
      return;
    }

    this.errorMessage$.next(null);

    this.userService
      .loginUser({
        login: this.loginForm.value.login,
        password: this.loginForm.value.password
      })
      .subscribe({
        error: (err) => {
          if (err.status === HttpStatusCode.BadRequest) {
            this.errorMessage$.next('Identifiants incorrects');
          } else {
            this.errorMessage$.next('Une erreur est survenue');
          }
        },
        next: (res) => {
          this.loginForm.reset();
          this.authenticationService.authenticateUser(res.token, res.login);
          this.router.navigate(['/']);
        }
      });
  }
}

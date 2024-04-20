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

  loginForm = new FormGroup({
    login: new FormControl('', [CustomValidators.required]),
    password: new FormControl('', [CustomValidators.required])
  });

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    if (!this.loginForm.value.login || !this.loginForm.value.password) {
      return;
    }

    this.userService
      .loginUser({
        login: this.loginForm.value.login,
        password: this.loginForm.value.password
      })
      .subscribe((res) => {
        console.log('User logged in', res);
        this.loginForm.reset();
      });
  }
}

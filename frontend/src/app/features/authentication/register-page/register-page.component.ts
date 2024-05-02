import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserFormComponent } from '../../../components/user-form/user-form.component';
import { BehaviorSubject } from 'rxjs';
import { CreateUser } from '../../../models/create-user.type';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
  userService = inject(AuthenticationService);
  router = inject(Router);

  isLoading$ = new BehaviorSubject<boolean>(false);

  registerUser(user: CreateUser) {
    this.isLoading$.next(true);
    this.userService.registerUser(user).subscribe(() => {
      this.isLoading$.next(false);
      this.router.navigate(['/']);
    });
  }
}

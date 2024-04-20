import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { BehaviorSubject } from 'rxjs';
import { CreateUser } from '../../models/create-user.type';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  user$ = new BehaviorSubject<CreateUser | null>(null);
}

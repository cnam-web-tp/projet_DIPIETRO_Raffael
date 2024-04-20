import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);

  declare user$: Observable<User>;

  ngOnInit(): void {
    this.user$ = this.userService.profile();
  }
}

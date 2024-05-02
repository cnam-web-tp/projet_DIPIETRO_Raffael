import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {
  userService = inject(AuthenticationService);

  declare user$: Observable<User>;

  ngOnInit(): void {
    this.user$ = this.userService.profile();
  }
}

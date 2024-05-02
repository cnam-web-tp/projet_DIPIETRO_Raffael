import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TUI_SANITIZER } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/layout/navbar/navbar.component';
import { FooterComponent } from './features/layout/footer/footer.component';
import { BehaviorSubject } from 'rxjs';
import { CreateUser } from './models/create-user.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TuiRootModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }]
})
export class AppComponent {
  user$ = new BehaviorSubject<CreateUser | null>(null);
}

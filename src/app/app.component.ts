import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER
} from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BehaviorSubject } from 'rxjs';
import { CreateUser } from './models/create-user.type';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { CartState } from './state/cart/cart.state';

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

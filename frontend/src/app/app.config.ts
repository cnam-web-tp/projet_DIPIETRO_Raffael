import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZxvbnServiceForPSM } from 'angular-password-strength-meter/zxcvbn';

import { routes } from './app.routes';
import {
  translations,
  dictionary as dictionaryFr
} from '@zxcvbn-ts/language-fr';
import { dictionary } from '@zxcvbn-ts/language-common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CartState } from './state/cart/cart.state';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
    provideZxvbnServiceForPSM({
      translations,
      dictionary: {
        ...dictionary,
        ...dictionaryFr
      }
    }),
    importProvidersFrom(
      NgxsModule.forRoot([CartState], { developmentMode: true })
    ),
    importProvidersFrom(NgxsReduxDevtoolsPluginModule.forRoot()),
    provideHttpClient()
  ]
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { APP_SETTINGS, appSettings } from './app.settings';
import { BrowserModule } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideNoopAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: APP_SETTINGS, useValue: appSettings },
  ],
};

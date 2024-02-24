import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { APP_SETTINGS, appSettings } from './app.settings';
import { BrowserModule } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideNoopAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: APP_SETTINGS, useValue: appSettings },
  ],
};

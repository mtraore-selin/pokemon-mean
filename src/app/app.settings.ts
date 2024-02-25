import { InjectionToken } from '@angular/core';

export interface AppSettings {
  title: string;
  version: string;
  apiUrl: string;
}

export const appSettings: AppSettings = {
  title: 'Lab5 Pokemon App',
  version: '1.0',
  apiUrl: 'https://pokemon-mean.onrender.com/api/v1',
  // apiUrl: 'http://localhost:3000/api/v1',
};

export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');

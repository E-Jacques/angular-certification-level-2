import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStorage } from './providers/provide-storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStorage(),
    provideRouter(routes, withComponentInputBinding())
  ]
};

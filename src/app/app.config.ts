import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([HttpErrorInterceptor])
      ),
    provideTranslateHttpLoader(),
    provideTranslateService({
      loader: provideTranslateHttpLoader(),
    })

  ]
};

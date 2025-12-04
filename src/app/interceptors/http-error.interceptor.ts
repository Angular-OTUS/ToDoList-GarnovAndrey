import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastService } from "@app/services/toast";
import { catchError, Observable, throwError } from "rxjs";
import { TranslateService } from '@ngx-translate/core';

export function HttpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const toastService = inject(ToastService);
  const translateService = inject (TranslateService);
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = translateService.instant('HTTP-ERROR.DEFAULT-ERROR');

        if (error.error instanceof ErrorEvent) {
          errorMessage = `${translateService.instant('HTTP-ERROR.ERROR')}: ${error.error.message}`;
        } else {
          errorMessage = `${translateService.instant('HTTP-ERROR.ERROR-SERVER')}: ${error.status} - ${error.message}`;
        }

        toastService.error(errorMessage);
        return throwError(() => error);
      })
    )
}


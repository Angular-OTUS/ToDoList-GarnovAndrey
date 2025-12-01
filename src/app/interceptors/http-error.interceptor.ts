import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastService } from "@app/services/toast";
import { catchError, Observable, throwError } from "rxjs";

export function HttpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let toastService = inject(ToastService)
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Произошла ошибка';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Ошибка: ${error.error.message}`;
        } else {
          errorMessage = `Ошибка сервера: ${error.status} - ${error.message}`;
        }

        toastService.error(errorMessage);
        return throwError(() => error);
      })
    )
}


import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from '../core/services/users.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public usersService: UsersService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let error;
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.usersService.logout();
                location.reload(true);
            }
            error = err.error || err.statusText;
            return throwError(error);
        }));
    }
}
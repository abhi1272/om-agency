import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { UsersService } from '../core/services/users.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public usersService: UsersService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              let errorMsg = ''
              if (error.error instanceof ErrorEvent) {
                console.log('this is client side error')
                errorMsg = `Error: ${error.error.message}`
              } else {
                console.log('this is server side error')
                errorMsg = `${error.error.message}`
              }
              console.log(errorMsg)
              return throwError(errorMsg)
            })
          )
      }
}

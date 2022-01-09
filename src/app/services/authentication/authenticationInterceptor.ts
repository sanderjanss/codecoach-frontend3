import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}
  private authorization = 'Authorization';
  private authMethod = 'Bearer ';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authenticationService.isLoggedIn()) {
      console.log("intercepting request... cloning headers");
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.getToken()}`,
          ContentType: `application/json`,
        },
      });
    }
    console.log(JSON.stringify(req.headers));

    return next.handle(req).pipe(
      tap((response: HttpEvent<any>) => {
        // @ts-ignore
        if (response.headers && response.headers.get(this.authorization)) {
          console.log("I don't think I should be in here.....");
          // @ts-ignore
          console.log(response.headers.get(this.authorization));
          this.authenticationService.setJwtToken(
            // @ts-ignore
            response.headers.get(this.authorization).replace(this.authMethod, '').trim()
          );
        }
      })
    );
  }
}

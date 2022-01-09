
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private url = `${environment.backendUrl}/login`;

  constructor(private http: HttpClient) { }

  //I GET THE TOKEN FROM THE BACKEND
  login(credentials: any): Observable<any> {
      return this.http.post(this.url, credentials, {observe: 'response'})
      .pipe(
        catchError(this.handleError())
        );
  }

  private handleError(operation = 'operation') {
    return (error: any) => {
      console.error(`found error on ${operation}: ${error}`);
      return throwError(error);
    };
  }
}

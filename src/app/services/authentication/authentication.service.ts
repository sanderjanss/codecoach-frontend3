import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { TokenError } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authorization = 'Authorization';
  private userLoggedInSource = new Subject<boolean>();
  public userId = new Subject<string>();

  constructor(private securityService: SecurityService) {}

  login(credentials: any): Observable<any> {
    return this.securityService.login(credentials).pipe(
      tap(
      (response: HttpHeaderResponse) => {
        console.log('http response header: ' + JSON.stringify(response));
        this.setJwtToken(
          response.headers.get('Authorization')?.substr(7) || ''
        );
        this.userLoggedInSource.next(true);
      },
      (error: string) => {
        console.log('error: ' + error);
        this.userLoggedInSource.next(false);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.authorization);
    this.userLoggedInSource.next(false);
  }

  isLoggedIn() {
    return localStorage.getItem(this.authorization) !== null;
  }

  getToken() {
    return localStorage.getItem(this.authorization);
  }

  getHeaderWithToken() : HttpHeaders{
    return new HttpHeaderResponse().headers.append(this.authorization, this.getToken() || "").append('Content-Type', 'application/json');
  }

  public setJwtToken(token: string): void {
    localStorage.setItem(this.authorization, token);
  }

  getUserId(): string {
    if (!this.isLoggedIn()) {
      return '';
    }
    const tokenDecoded: any = jwtDecode<JwtPayload>(this.getToken() || '');
    this.userId = tokenDecoded.sub;
    return tokenDecoded.sub;
  }

  public isCoach(): boolean {
    if (!this.isLoggedIn()) {
      console.log('not logged in');
      return false;
    }
    const tokenDecoded: any = jwtDecode<JwtPayload>(this.getToken() || '');

    let isCoach = false;
    tokenDecoded.rol.forEach((element: { authority: string; }) => {
      if (element.authority === 'COACH') {
        isCoach = true;
      }
    });

    return isCoach;
  }

  public isCoachee(): boolean {
    if (!this.isLoggedIn()) {
      console.log('not logged in');
      return false;
    }
    const tokenDecoded: any = jwtDecode<JwtPayload>(this.getToken() || '');

    let isCoachee = false ;
    tokenDecoded.rol.forEach((element: { authority: string; }) => {
      if (element.authority === 'COACHEE') {
        isCoachee = true;
      }
    });
    return isCoachee;
  }
}

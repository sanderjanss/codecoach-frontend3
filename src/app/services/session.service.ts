import { Observable } from 'rxjs';
import { Session } from './../entities/session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private url = `${environment.backendUrl}`;

  constructor(private http: HttpClient,private router: Router,
    private _snackBar: MatSnackBar, private authentication: AuthenticationService){

  }

  addSession(session:Session): Observable<Session>{
    return this.http.post<Session>(`${this.url}/sessions`,session)
  }

  getAllSessionsByUserId(){
    const userId = this.authentication.getUserId();
    return this.http.get<Session[]>(`${this.url}/users/${userId}/sessions`);
  }

  isUserTheSessionCoach(session:Session): boolean{
    if(session){
      if(session.coachId === this.authentication.getUserId()){
        return true;
      }
    }
    return false;
  }
}

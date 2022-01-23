import { Observable } from 'rxjs';
import { Session } from './../entities/session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication/authentication.service';
import {Users} from "../entities/users";
// import { Feedback } from '../entities/feedback';

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


  // getFeedback(session: Session){
  //   const geturl = `${this.url}/sessions/${session.sessionId}/getfeedback`;
  //
  //    return this.http.get<Feedback>(geturl);
  // }

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
  isUserTheSessionCoachee(session:Session): boolean{
    if(session){
      if(session.coacheeId === this.authentication.getUserId()){
        return true;
      }
    }
    return false;
  }

  /////////////////////////////////////////////////////////

  getSessionById(id: string | any): Observable<any> {
    const url = `${this.url}/sessions/${id}`;
    return this.http.get<Session>(url, id);
  }

  updateCoachingSessionState(session: Session): any{
    const updateUrl = `${this.url}/sessions/${session.sessionId}`;
    const sessionStatus = session.sessionStatus;
    return this.http.put<any>(updateUrl,sessionStatus).subscribe()

  }

  updateFeedbackFromCoachee(session: Session): any{
    const updateUrl = `${this.url}/sessions/${session.sessionId}/addfeedback`;
    console.log(session.feedbackFromCoachee)
    console.log(session.feedbackFromCoach)
    console.log(session.sessionId)
    const feedbackFromCoachee = session.feedbackFromCoachee;
    console.log(feedbackFromCoachee)
    return this.http.put<any>(updateUrl,feedbackFromCoachee).subscribe()
  }
  updateFeedbackFromCoach(session: Session): any{
    const updateUrl = `${this.url}/sessions/${session.sessionId}/addfeedback`;
    console.log(session.feedbackFromCoachee)
    console.log(session.feedbackFromCoach)
    console.log(session.sessionId)
    const feedbackFromCoach = session.feedbackFromCoach;
    console.log(feedbackFromCoach)
    return this.http.put<any>(updateUrl,feedbackFromCoach).subscribe()

  }
}

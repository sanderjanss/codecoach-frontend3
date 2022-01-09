import {Injectable} from '@angular/core';
import {Users} from "../entities/users";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  private userURL = `${environment.backendUrl}/users`;

  constructor(private http: HttpClient,private router: Router,
    private _snackBar: MatSnackBar, private authentication: AuthenticationService) {
    }

    
  registerUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.userURL, user, this.httpOptions);
  }















  updateUser(user:Users,id: string | any): Observable<Users> {
    const url = `${this.userURL}/${id}`;
    return this.http.put<Users>(url, user, this.getUserHeader());
  }


  registerAndLogin(user: Users) {
    this.registerUser(user).subscribe(res => {
      this.login(user);
    });
  }


   login(user: any) {
    const url = `${environment.backendUrl}/login`;

    this.http.post(url, user, {observe: 'response'}).subscribe(res => {
      localStorage.setItem('authorization', res.headers.get('authorization')?.substr(7) || '')

    const token: any = this.getAuthToken();
    try{  this.router.navigate(['/coachees', token.sub]);}
    catch{{
      this._snackBar.open("Invalid combination", "close",{
        duration: 2000,
        verticalPosition:'top'
      });
    }}

    });
  }

  logout() {
    localStorage.removeItem('authorization');
  }

  requestCoach(id: string, coachStatus: boolean) {
    const url = this.userURL + `/${id}?coachStatus=${coachStatus}`;
    const authToken: any = this.authentication.getUserId();
    if (authToken === id) {
      const authorizationKey = this.getUserHeader().headers.keys().values();
      this.http.put<Users>(url, {params: {coachStatus: true}}, {observe: 'response'}).subscribe(res => {
        if(res.headers.get("Authorization") != null){
          let token = res.headers.get("authorization") || '';
          this.authentication.setJwtToken(token);
          this.router.navigate(['coachdetails/edit/', id]);
        }
      })
    } else {
      console.log("Can't change status of other user");
    }
  }


  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.userURL, this.getUserHeader());
  }

  getUserById(id: string | any): Observable<any> {
    const url = `${this.userURL}/${id}`;
    return this.http.get<Users>(url, id);
  }

  getUserHeader() {
    // return this.authentication.getHeaderWithToken();
    const authToken = localStorage.getItem('authorization');
    return {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'})
        .append('authorization', "Bearer " + authToken || "")
    };
  }

  isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }


  getAuthToken() {

    const token: any = this.authentication.getToken();
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }

  getIdFromToken() {
    return this.authentication.getUserId();
  }

}

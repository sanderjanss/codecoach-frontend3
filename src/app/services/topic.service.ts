import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Topic} from "../entities/topic";
import {Topicname} from "../entities/topicname";

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private _topicsUrl: string;
  private headers = new HttpHeaders().set('Accept', 'application/json');

  constructor(private http: HttpClient) {
    this._topicsUrl = `${environment.backendUrl}/topics`;
  }

  getTopics(): Observable<Topicname[]> {
    return this.http.get<Topicname[]>(this._topicsUrl);
  }
}

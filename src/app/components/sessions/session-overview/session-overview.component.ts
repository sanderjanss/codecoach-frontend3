import { Session } from './../../../entities/session';
import { LoaderService } from './../../../loader/loader.service';
import { SessionService } from './../../../services/session.service';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-session-overview',
  templateUrl: './session-overview.component.html',
  styleUrls: ['./session-overview.component.scss']
})
export class SessionOverviewComponent implements OnInit {

  sessions:Array<Session> = [];

  @Input() session? :Session
  constructor(private sessionsService :SessionService, public loader:LoaderService) { }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(){
    this.sessionsService.getAllSessionsByUserId().subscribe(sessions => this.sessions = sessions);
  }





}

import { Component, OnInit, ViewChild} from '@angular/core';
import { Input } from '@angular/core';
import { Session } from 'src/app/entities/session';
import { SessionService } from 'src/app/services/session.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/entities/users';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss']
})
export class SessionCardComponent implements OnInit {

  @Input() public session: Session | undefined;
  updateSession: FormGroup;

  constructor(private sessionService: SessionService, private userService: UserService) {
  this.updateSession = new FormGroup(
    {
      sessionStatus: new FormControl('', [Validators.required])
    }
    );

  }

  coachee!: Users;
  coach!: Users;

  coachName: string = "unknown";
  coacheeName: string = "unknown";

  ngOnInit(): void {
    this.getCoachee();
    this.getCoach();
    // this.dateControl = new FormControl(this.session.date);
  }

  isUserTheSessionCoach(): boolean {
    if (this.session) {
    return this.sessionService.isUserTheSessionCoach(this.session);
    }
    return false;
  }

  isArchived(): boolean {
    return false;
  }

  getCoachee(): void {
    console.log(this.session);
    if(this.session){
    this.userService.getUserById(this.session.coacheeId).subscribe(coachFromSession => { this.coachee = coachFromSession;});
    }
  }

  getCoach(): void {
    console.log(this.session);
    if(this.session){
      this.userService.getUserById(this.session.coachId).subscribe(coachFromSession => {this.coach = coachFromSession;});
    }
  }

  getUserName(user: Users) : string {
    return user.firstName + ' ' + user.lastName;

  }

  getCoachName(): string {
    return this.getUserName(this.coach);
  }

  getCoacheeName(): string {
    return this.getUserName(this.coachee);
  }

  updateSessionSignature(){

  }

}

import { Session } from './../../../entities/session';
import { LoaderService } from './../../../loader/loader.service';
import { SessionService } from './../../../services/session.service';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {UserService} from "../../../services/user.service";
import {Users} from "../../../entities/users";

import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-session-overview',
  templateUrl: './session-overview.component.html',
  styleUrls: ['./session-overview.component.scss']
})
export class SessionOverviewComponent implements OnInit {


  @Input() public session: Session | undefined;
  coachee!: Users;
  coach!: Users;

  requestedSessions: Session[] = [];
  awaitingFeedbackSessions: Session[] = [];
  archivedSessions: Session[] = [];

  coachName: string = "unknown";
  coacheeName: string = "unknown";

  constructor(private router: Router,
              public sessionService: SessionService,
              public authenticationService: AuthenticationService,
              private userService: UserService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getSessions(this.authenticationService.getUserId());
    // this.getCoachee();
    // this.getCoach();
  }

  getSessions(id: string): void {
    this.sessionService.getAllSessionsByUserId().subscribe(
      response => {
        this.requestedSessions = response.filter(session => (session.sessionStatus!.toString() === 'REQUESTED' || session.sessionStatus!.toString() === 'ACCEPTED'));

        this.awaitingFeedbackSessions = response.filter(session => session.sessionStatus!.toString() === 'DONE_WAITING_FOR_FEEDBACK');
        this.archivedSessions = response.filter(session => session.sessionStatus!.toString() === 'FINISHED' || session.sessionStatus!.toString() === 'CANCELLED_BY_COACH' ||
          session.sessionStatus!.toString() === 'CANCELLED_BY_COACHEE' || session.sessionStatus!.toString() === 'DECLINED');

      }
    )
  }

  //////////////////////////////////////////////

  updateCoachingSessionStateAccepted(session:Session ):void{
    session.sessionStatus="ACCEPTED";
    this.sessionService.updateCoachingSessionState(session);
  }

  updateCoachingSessionStateDeclined(session:Session):void{
    session.sessionStatus="DECLINED";
    this.sessionService.updateCoachingSessionState(session);
  }

  updateCoachingSessionStateCancel(session:Session):void{
    session.sessionStatus="CANCELLED_BY_COACHEE";
    this.sessionService.updateCoachingSessionState(session)
  }
  isUserTheSessionCoach(session:Session): boolean {
    if (session) {
      return this.sessionService.isUserTheSessionCoach(session);
    }
    return false;
  }

  isUserTheSessionCoachee(session:Session): boolean {
    if (session) {
      return this.sessionService.isUserTheSessionCoachee(session);
    }
    return false;
  }





/////////////////////////////////////////////////



  isUserCoacheeOfSession(session: Session): boolean {
    return this.authenticationService.getUserId() === session.coacheeId;
  }

  isUserCoachOfSession(session: Session): boolean {
    return this.authenticationService.getUserId() === session.coachId;
  }

  // isLoggedInUserProfile(): boolean {
  //   return this.user.id === this.authenticationService.getUserId();
  // }



  openCoacheeFeedbackDialog(session: Session) {
    this.dialog.open(CoacheeFeedbackDialog, {
      minWidth: 500,
      data: {
        'sessionId': session.sessionId,
        'topic': session.topic,
        'coacheeId': session.coacheeId,
        'coacheeName': session.coacheeName,
        'coachId': session.coachId,
        'coachName': session.coachName,
        'date': '',
        'sessionType': session.sessionType,
        'remarks': session.remarks,
        'sessionStatus': session.sessionStatus,
        'feedbackFromCoach': session.feedbackFromCoach,
        'feedbackFromCoachee': session.feedbackFromCoachee
      },
    });
  }

  openCoachFeedbackDialog(session: Session) {
    this.dialog.open(CoachFeedbackDialog, {
      minWidth: 500,
      data: {
        'sessionId': session.sessionId,
        'topic': session.topic,
        'coacheeId': session.coacheeId,
        'coacheeName': session.coacheeName,
        'coachId': session.coachId,
        'coachName': session.coachName,
        'date': '',
        'sessionType': session.sessionType,
        'remarks': session.remarks,
        'sessionStatus': session.sessionStatus,
        'feedbackFromCoach': session.feedbackFromCoach,
        'feedbackFromCoachee': session.feedbackFromCoachee
      },
    });
  }
  openMyCoacheeFeedbackDialog(session: Session) {
    this.dialog.open(MyCoacheeFeedbackDialog, {
      minWidth: 500,
      data: {
        'topic': session.topic,
        'coacheeName': session.coacheeName,
        'coachName': session.coachName,
        'feedbackFromCoachee': session.feedbackFromCoachee
      },
    });
  }

  openMyCoachFeedbackDialog(session: Session) {
    this.dialog.open(MyCoachFeedbackDialog, {
      minWidth: 500,
      data: {
        'topic': session.topic,
        'coacheeName': session.coacheeName,
        'coachName': session.coachName,
        'feedbackFromCoach': session.feedbackFromCoach
      },
    });
  }

}



@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: '../feedback/coachee_feedback.html',
})
export class CoacheeFeedbackDialog {

  coacheeFeedbackForm: FormGroup = this.formBuilder.group({
        feedbackFromCoach: new FormControl('', [Validators.required])
       }
     );

  constructor(@Inject(MAT_DIALOG_DATA) public data: Session, private sessionService: SessionService, private formBuilder: FormBuilder) {

  }


  save() {
    console.log("feedback for coachee")
    this.data.feedbackFromCoach = this.coacheeFeedbackForm.value.feedbackFromCoach
    this.sessionService.updateFeedbackFromCoach(this.data)
  }
}

@Component({
  selector: 'dialog-data-example-dialog2',
  templateUrl: '../feedback/coach_feedback.html',
})
export class CoachFeedbackDialog {

  coachFeedbackForm: FormGroup = this.formBuilder.group({
      feedbackFromCoachee: new FormControl('', [Validators.required])
}
);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Session, private sessionService: SessionService, private formBuilder: FormBuilder) {

  }

  save() {
    console.log("feedback for coach")
    this.data.feedbackFromCoachee = this.coachFeedbackForm.value.feedbackFromCoachee
    this.sessionService.updateFeedbackFromCoachee(this.data)
  }

}

@Component({
  selector: 'mycoacheefeedbackdialog',
  templateUrl: '../feedback/view_coachee_feedback.html',
})
export class MyCoacheeFeedbackDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Session, public sessionService: SessionService) {

  }

}

@Component({
  selector: 'mycoachfeedbackdialog',
  templateUrl: '../feedback/view_coach_feedback.html',
})
export class MyCoachFeedbackDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Session) {

  }
}



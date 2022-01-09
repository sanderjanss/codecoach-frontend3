import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './../../../services/session.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Users } from 'src/app/entities/users';
import { UserService } from 'src/app/services/user.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss'],
})
export class AddSessionComponent implements OnInit {
  newSession: FormGroup;
  coachee!: Users;
  coach!: Users;

  public selectedTime?: Time;

  minDate: Date = new Date();

  constructor(
    private sessionService: SessionService,
    private authentication: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackbar: MatSnackBar,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.newSession = new FormGroup({
      date: new FormControl('',[Validators.required]),
      time: new FormControl('',[Validators.required]),
      topic: new FormControl('',[Validators.required]),
      sessionType: new FormControl('',[Validators.required]),
      remarks: new FormControl(''),
        });
  }

  ngOnInit(): void {
    const coacheeId = this.authentication.getUserId();
    const coachId = this.route.snapshot.paramMap.get('id');
     this.userService.getUserById(coacheeId).subscribe((user) => {
       this.coachee = user });
     this.userService.getUserById(coachId).subscribe(
       (user) => {this.coach = user
      });

    this.minDate = this.intializeTime();
  }

  convertSessionTypeToEnum(sessionType: string) {
    switch (sessionType) {
      case 'Online':
        return 'ONLINE';
      case 'Face-To-Face':
        return 'FACE_TO_FACE';
      default: return 'ONLINE';
    }
  }

  intializeTime():Date{
    let now: Date = new Date();
    now.setDate(now.getDate() + 1);
    return now;
  }


  submit() {
    const sessionType = this.convertSessionTypeToEnum(this.newSession.value.sessionType);
    const session: any = {
      coachId: this.coach.userId,
      coacheeId: this.coachee.userId,
      topic: this.newSession.value.topic,
      date: this.newSession.value.date,
      time: this.newSession.value.time,
      sessionType: sessionType,
      remarks: this.newSession.value.remarks,
    };
    this.sessionService.addSession(session).subscribe(
      (data) => {
        this.displaySnackbar('Session added successfully');
        this.router.navigate(['/coach/sessions']);
      },
      (error) => {
        this.displaySnackbar('Error adding session');
      }
    );
  }

  displaySnackbar(message: string) {
    this._snackbar.open(message, 'close', { duration: 2000 });
  }
  // redirectUser() {
  //   this.router.navigate([`sessions/${this.authentication.getUserId()}`]);
  // }
}

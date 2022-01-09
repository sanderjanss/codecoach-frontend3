import { Component, Input, OnInit } from '@angular/core';
import { Users } from '../../../entities/users';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-request-coach',
  templateUrl: './request-coach.component.html',
  styleUrls: ['./request-coach.component.scss'],
})
export class RequestCoachComponent implements OnInit {
  @Input() coachee?: Users;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location,
    private _snackBar: MatSnackBar,
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    if (this.authentication.isCoach()) {
      this.goBack();
    }
    this.getCoachee();
  }

  getCoachee() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService
      .getUserById(id)
      .subscribe((coachee) => (this.coachee = coachee));
  }

  goBack() {
    this.location.back();
  }

  requestCoach() {
    const id = this.authentication.getUserId();
    if (id != null) {
      // @ts-ignore
      const coachStatus = this.authentication.isCoachee();
      console.log(coachStatus);
      this.userService.requestCoach(id, coachStatus);
      this.location.back();
      setTimeout(() => {
        this._snackBar.open('Request Approved!', 'close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }, 5000);
    }
  }
}

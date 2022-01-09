import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { Users } from '../../../../entities/users';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spec-coachee',
  templateUrl: './specific-coachee.component.html',
  styleUrls: ['./specific-coachee.component.scss'],
})
export class SpecificCoacheeComponent implements OnInit {
  coachee!: Users;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCoachee();
  }

  getCoachee() {
    this.route.params.subscribe((params) => {
      this.userService
        .getUserById(this.route.snapshot.params.id)
        .subscribe((coachee) => {
          this.coachee = coachee;
        });
    });
  }

  getUserId(): string {
    return this.route.snapshot.params.id;
  }

  goBack() {
    this.location.back();
  }

  allowedUser(): boolean {
    return this.route.snapshot.params.id == this.authentication.getUserId();
  }

  isCoach(): boolean {
    return this.authentication.isCoach();
  }

  isCoachee(): boolean {
    return this.authentication.isCoachee();
  }

  // redirectToCoachingSessions() {
  //   this.router.navigate([`sessions/${this.coachee.userId}`]);
  // }
}

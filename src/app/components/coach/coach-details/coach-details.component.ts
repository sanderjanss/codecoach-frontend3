import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CoachDetails } from 'src/app/entities/coach-details';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from 'express';

@Component({
  selector: 'app-coach-details',
  templateUrl: './coach-details.component.html',
  styleUrls: ['./coach-details.component.scss'],
})
@Inject('userService')
export class CoachDetailsComponent implements OnInit {
  @Input() coachDetail?: CoachDetails;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getCoachDetails();
  }

  private getCoachDetails() {
    this.route.params.subscribe((params) => {
      this.userService
        .getUserById(this.route.snapshot.params.id)
        .subscribe((coachdetail) => {
          this.coachDetail = coachdetail.coachDetails;
        });
    });
  }
}

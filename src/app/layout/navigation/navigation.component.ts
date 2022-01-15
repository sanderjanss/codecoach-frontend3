import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/entities/users';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() public title: string = 'Home';
  @Input() public id?: string = '';
  coachee?: Users;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('authorization'));
    this.getCoachee();

    this.id = this.getID().toString();
  }

  logout() {
    this.authentication.logout();
  }

  async isLoggedIn() {
    return await this.authentication.isLoggedIn();
  }

  LoadOnce() {
    window.location.reload();
  }

  getCoachee() {
    // const id = this.route.snapshot.paramMap.get('id');
    const id = this.authentication.getUserId();
    this.userService.getUserById(id).subscribe((coachee) => {
      this.coachee = coachee;
    });
  }

  coacheeId(): string | any {
    return this.id;
  }
  getID() {
    return this.authentication.getUserId();
  }
}

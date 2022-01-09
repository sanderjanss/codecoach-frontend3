import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() public id?:string = '';

  constructor(public userService : UserService, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.id = this.getID().toString();
  }

  logout(){
    this.authentication.logout();
  }

  isLoggedIn(){
    return this.authentication.isLoggedIn();
  }

  LoadOnce()
  {
    window.location.reload();
  }

  getID() {
    return this.authentication.getUserId();
  }

}

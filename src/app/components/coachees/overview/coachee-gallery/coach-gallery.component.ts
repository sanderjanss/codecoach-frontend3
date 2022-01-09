import { Component, OnInit } from '@angular/core';
import {UserService} from "src/app/services/user.service";
import {Users} from "src/app/entities/users";
import {LoaderService} from "../../../../loader/loader.service";

@Component({
  selector: 'app-coachee',
  templateUrl: './coach-gallery.component.html',
  styleUrls: ['./coach-gallery.component.scss']
})
export class CoachGalleryComponent implements OnInit {

  coachees: Array<Users> = [];
  constructor(private userService: UserService, public loader: LoaderService) { }

  ngOnInit(): void {
    this.getCoachees();

  }

  getCoachees(){
    this.userService.getAllUsers().subscribe(coachees => this.coachees = coachees);
  }

}

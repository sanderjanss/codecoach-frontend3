import { Component, OnInit } from '@angular/core';
import {UserService} from "src/app/services/user.service";
import {Users} from "src/app/entities/users";
import {LoaderService} from "../../../../loader/loader.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TopicService} from "../../../../services/topic.service";
import {Topicname} from "../../../../entities/topicname";

@Component({
  selector: 'app-coachee',
  templateUrl: './coach-gallery.component.html',
  styleUrls: ['./coach-gallery.component.scss']
})
export class CoachGalleryComponent implements OnInit {

  coachees: Array<Users> = [];
  constructor(private userService: UserService,
              public loader: LoaderService,
              private fb: FormBuilder,
              private topicService: TopicService) { }

///////////////////////////////////////////////

  coaches: Users[] = [];
  topic!: string;
  partialSearch!: string;
  topics: Array<Topicname> = [];
  searchForm!: FormGroup;
  searchQuery!: any;
  defaultImg!: string;
  public searchText: string = '';

////////////////////////////////////////////////////

  ngOnInit(): void {


////////////////////////////////////////////////////

    this.topic = '';
    this.partialSearch = '';

    this.searchForm = this.fb.group({
      topics: [''],
      searchQuery: ['']
    });
    this.defaultImg = "assets/images/default-profile-pic.png";
    this.topicService.getTopics().subscribe(topics => this.topics = topics);
    this.getCoachees();
//////////////////////////////////////////////////////
  }
  

  getCoachees(){
    this.userService.getAllUsers(this.topic).subscribe(coachees => this.coachees = coachees);
    // this.coachService.getCoaches(this.topic, this.partialSearch)
    //   .subscribe(coaches => this.coaches = coaches);
  }

  searchCoach(key: string):void{
    const results: Users[] = [];
    for(const Users of this.coachees){
      if(Users.firstName.toLowerCase().indexOf(key.toLowerCase()) !== - 1
        || Users.lastName.toLowerCase().indexOf(key.toLowerCase()) !== - 1){
        results.push(Users);
      }
    }
    if (results.length === 0 || !key){
      this.getCoachees();
    }
    this.coachees=results;
  }

//////////////////////////////////////////////////////

  submit() {
    this.topic = this.searchForm.value['topics'];
    this.partialSearch = this.searchForm.value['searchQuery'];
    this.getCoachees();

  }


//////////////////////////////////////////////////////

}

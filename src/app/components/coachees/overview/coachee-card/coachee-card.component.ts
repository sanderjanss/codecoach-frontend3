import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/entities/users';
import { Input } from '@angular/core';

@Component({
  selector: 'app-coachee-card',
  templateUrl: './coachee-card.component.html',
  styleUrls: ['./coachee-card.component.scss']
})
export class CoacheeCardComponent implements OnInit {
  @Input() public coachee? : Users;
  constructor() {
  }

  ngOnInit(): void {
  }

}

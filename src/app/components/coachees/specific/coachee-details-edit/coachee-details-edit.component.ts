import { Users } from 'src/app/entities/users';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coachee-details',
  templateUrl: './coachee-details-edit.component.html',
  styleUrls: ['./coachee-details-edit.component.scss']
})
export class CoacheeDetailsEditComponent implements OnInit {

  coachees: Array<Users> = [];
  updateCoachee: FormGroup;
  hide = true;

  @Input() coachee?: Users;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
              ) {
      this.updateCoachee = new FormGroup
      ({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        imageUrl : new FormControl(''),
        coachDetails: new FormGroup({
          availableTime: new FormControl(''),
          introduction: new FormControl('' ),
          topics: new FormGroup
          ({
            coachKnowledgeLevel: new FormControl(''),
            topic: new FormGroup
            ({
              name: new FormControl('')
            })
          })
        })
      });
    }


      ngOnInit(): void {

        this.getCoachee();
      }

      getCoachee() {
        const id = this.route.snapshot.paramMap.get('id');
        this.userService.getUserById(id).subscribe(coachee => this.coachee = coachee)
      }

      firstNameIsRequired(){
        return this.updateCoachee.get('firstName')?.hasError('required');
      }

      lastNameIsRequired(){
        return this.updateCoachee.get('lastName')?.hasError('required');
      }

      companyHasError(){
        return this.updateCoachee.get('company')?.hasError('required')
      }

      redirectUserAfterUpdatingDetails(){
        this.updatecoacheeAndRedirect();
      }

      updatecoacheeAndRedirect(){
        this.userService.updateUser(this.updateCoachee.value,this.route.snapshot.paramMap.get('id')).subscribe(coachee => {
          this.coachees.push(coachee);
          this.displaySnackBar();
          this.goToUserProfile();
        });
      }

      displaySnackBar(){
        this._snackBar.open("Success", "CLOSE");
      }

      goToUserProfile(){
        this.router.navigateByUrl(`/coachees/`+this.route.snapshot.paramMap.get('id'));
      }

      formFieldHasError(){
        return !this.updateCoachee.valid;
      }


}

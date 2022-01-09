import { Users } from 'src/app/entities/users';
import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl,FormGroup,Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  coachees: Array<Users> = [];


   registerCoachee: FormGroup;
   loginCoachee?: Users




  hide = true;
  registeredUser$ = new Subject();


  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private authentication: AuthenticationService) {
                this.registerCoachee = new FormGroup({
                  firstName: new FormControl('', [Validators.required]),
                  lastName: new FormControl('', [Validators.required]),
                  company: new FormControl('', [Validators.required]),
                  email: new FormControl('', [Validators.required, Validators.email]),
                  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
                });

              }

  ngOnInit(): void {

  }

  formFieldHasError(){
    return !this.registerCoachee.valid;
  }


  getpasswordLength(){
    return this.registerCoachee.get('password')?.value?.length.toString();
  }

  firstNameIsRequired(){
    return this.registerCoachee.get('firstName')?.hasError('required');
  }

  lastNameIsRequired(){
    return this.registerCoachee.get('lastName')?.hasError('required');
  }

  emailIsRequired(){
    return this.registerCoachee.get('email')?.hasError('required');
  }

  emailIsNotValid(){
    return this.registerCoachee.get('email')?.hasError('email');
  }

  passwordIsRequired(){
    return this.registerCoachee.get('password')?.hasError('required');
  }

  passwordIsTooShort(){
    return this.registerCoachee.get('password')?.hasError('minlength');
  }


  companyHasError(){
    return this.registerCoachee.get('company')?.hasError('required')
  }

  redirectUserAfterRegister(){
    try{ this.addCoachee()}
    catch{{
      this._snackBar.open("User already exists", "close",{
      duration: 2000,
      verticalPosition:'top'
    });
    }}
    this.displaySnackBar();
    this.goToLoginPage();
  }

  addCoachee(){
    this.userService.registerUser(this.registerCoachee.value).subscribe(coachee => {
      this.coachees.push(coachee);
    });
  }


  displaySnackBar(){
    this._snackBar.open("Success", "CLOSE");
  }

  goToLoginPage(){
    this.router.navigateByUrl(`login`);
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private userId: string;
  hide = true;
  signInForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authentication: AuthenticationService
  ) {
    this.signInForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
    this.userId = '';
  }

  ngOnInit(): void {
    this.authentication.userId.subscribe((userId) => (this.userId = userId));
  }

  emailIsRequired() {
    return this.signInForm.get('email')?.hasError('required');
  }

  passwordIsRequired() {
    return this.signInForm.get('password')?.hasError('required');
  }

  submit() {
    this.authentication.login(this.signInForm.value).subscribe((_) => {
      this.userId = this.authentication.getUserId();
      this.router.navigate(['coachees/' + this.userId]);
    });
  }
}

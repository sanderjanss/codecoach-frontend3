import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  createContact: FormGroup;


  constructor(private _snackBar: MatSnackBar) {
    this.createContact = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      question: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  sendFormAndOk() {
    this._snackBar.open("Your message has been received!", "CLOSE")
    this.createContact.reset();
  }

  firstNameIsRequired() {
    return this.createContact.get('fullName')?.hasError('required');
  }

  emailIsRequired() {
    return this.createContact.get('email')?.hasError('required');
  }

  questionIsRequired() {
    return this.createContact.get('question')?.hasError('required');
  }

  formFieldHasError() {
    return !this.createContact.valid;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('f', { static: false }) signupForm: NgForm;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    console.log(form.value);
  }
}

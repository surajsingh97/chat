import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('f', { static: false }) signupForm: NgForm;
  constructor(private service: ApiService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(form: NgForm): Promise<void> {
    console.log(form);
    const formdata = {
      userName: form.value.username,
      email: form.value.email,
      password: form.value.password
    };
    const data = await this.service.request('signup', formdata);
    this.router.navigateByUrl('/login');
  }
}

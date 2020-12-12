import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: false }) loginForm: NgForm;
  constructor(private service: ApiService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(form: NgForm): Promise<void> {
    const formData = {
      email: form.value.email,
      password: form.value.password,
    };
    console.log('this is ', formData);
    const data = await this.service.request('login', formData);
    localStorage.setItem('token', data.tok);
  }
}

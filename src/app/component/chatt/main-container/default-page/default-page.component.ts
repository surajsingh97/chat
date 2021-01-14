import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css'],
})
export class DefaultPageComponent implements OnInit {
  public userName: any;

  constructor() {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decode: any = jwt_decode(token);
    this.userName = decode.id.userName;
  }
}

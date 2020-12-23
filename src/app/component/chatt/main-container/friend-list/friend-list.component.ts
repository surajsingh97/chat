import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from 'src/app/services/api.service';
import { GetsetService } from 'src/app/services/getset.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent implements OnInit {
  friendList: string[] = [];
  userName: string;
  friendData: any;
  id: any;
  constructor(
    private getsetService: GetsetService,
    private apiService: ApiService,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    const decode: any = jwt_decode(token);
    this.userName = decode.id.userName;
    this.id = decode.id._id;
  }

  ngOnInit(): void {
    this.loadfriendList();
  }

  async loadfriendList(): Promise<void> {
    this.friendData = await this.apiService.request('friend', {
      userId: this.id,
    });
    this.friendData[0].friends.forEach((element) => {
      this.friendList.push(element.userName);
    });
  }

  sendData(data): void {
    this.getsetService.setValue(data);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}

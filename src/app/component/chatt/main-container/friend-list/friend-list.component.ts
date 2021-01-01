import { ThrowStmt } from '@angular/compiler';
import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from 'src/app/services/api.service';
import { ChatService } from 'src/app/services/chat.service';
import { GetsetService } from 'src/app/services/getset.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent implements OnInit {
  friendList: any = [];
  userName: string;
  friendData: any;
  id: any;
  friendId: any;
  online = false;
  searchText: any;
  error: any;

  constructor(
    private getsetService: GetsetService,
    private apiService: ApiService,
    private router: Router,
    private chatService: ChatService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decode: any = jwt_decode(token);
      this.userName = decode.id.userName;
      this.getsetService.setValue(this.userName);
      this.id = decode.id._id;
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.online = true;
    }
    this.loadfriendList();
  }

  async loadfriendList(): Promise<void> {
    this.friendData = await this.apiService.request('friend', {
      userId: this.id,
    });
    this.friendData.result.friends.forEach((element) => {
      this.friendList.push(element);
    });
  }

  sendData(data): void {
    this.friendId = data.friendId;
    this.getsetService.setValue(data);
    this.router.navigateByUrl(`/home/chat/${this.friendId}`);
  }

  addFriend(): any {
    this.apiService
      .request('addFriend', {
        userName: this.searchText,
      })
      .then((data) => {
        if (data.result === 'Added Successfully!') {
          this.friendList.push({
            userName: this.searchText,
          });
          console.log(this.friendList);
          this.error = data.result;
        } else if (data.result === 'Already Exists in friend list!!') {
          this.error = data.result;
        } else {
          this.error = 'User Not Found!!';
        }
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}

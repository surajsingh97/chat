import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from 'src/app/services/api.service';
import { ChatService } from 'src/app/services/chat.service';
import * as _ from 'lodash';
import { GetsetService } from 'src/app/services/getset.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent implements OnInit {
  public userName: string;
  public friendData: any;
  public id: any;
  public online = false;
  public searchText: any;
  public error: any;
  public activeUser: any = [];
  public flag;

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
    this.chatService.getUser('user');
    this.loadactiveUser();
    this.loadfriendList();
    this.chatService.onlogOut().subscribe((message: any) => {
      this.activeUser = this.activeUser?.filter((user) => {
        return user !== message;
      });
    });
    this.notify();
  }

  async loadfriendList(): Promise<void> {
    const data = await this.apiService.request('friend', {
      userId: this.id,
    });
    this.friendData = this.sortFriends(data);
  }

  notify(): void {
    this.chatService.notification().subscribe((chatData: any) => {
      console.log(chatData);
      this.friendData.forEach((element) => {
        chatData.forEach((chat) => {
          try {
            if (element.friendId === chat?.friendId) {
              element.chat = chat;
            }
          } catch (e) {
            console.log('something wrong happenend');
          }
        });
      });
      this.friendData = this.sortFriends(this.friendData);
    });
  }

  sortFriends(data): void {
    return data.sort((a, b) => {
      return (
        new Date(b?.chat.chats[0].createdOn).valueOf() -
        new Date(a?.chat.chats[0].createdOn).valueOf()
      );
    });
  }

  loadactiveUser(): void {
    this.chatService.onlogIn().subscribe((message: any) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < message.length; i++) {
        if (this.activeUser.indexOf(message[i].userName) === -1) {
          this.activeUser.push(message[i].userName);
        }
      }
    });
  }

  sendData(data, i): void {
    this.flag = i;
    this.getsetService.setValue(data);
    this.router.navigateByUrl(`/home/chat/${data.friendId}`);
  }

  addFriend(): any {
    this.apiService
      .request('addFriend', {
        userName: this.searchText,
      })
      .then((data) => {
        if (data.result === 'Added Successfully!') {
          this.friendData.push({
            userName: this.searchText,
          });
          this.error = data.result;
        } else if (data.result === 'Already Exists in friend list!!') {
          this.error = data.result;
        } else {
          this.error = 'User Not Found!!';
        }
      });
  }

  checkOnline(name): any {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.friendData.length; i++) {
      if (this.activeUser.indexOf(name) > -1) {
        return 'online';
      } else {
        return 'ofline';
      }
    }
  }

  logout(): void {
    this.chatService.sendLogout(this.userName);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}

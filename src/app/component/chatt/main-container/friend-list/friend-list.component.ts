import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ApiService } from 'src/app/services/api.service';
import { ChatService } from 'src/app/services/chat.service';
import { GetsetService } from 'src/app/services/getset.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent implements OnInit {
  public friendList: any = [];
  public lastMessageData: any = [];
  public userName: string;
  public friendData: any;
  public id: any;
  public friendId: any;
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
    this.getAll();
    this.chatService.onlogOut().subscribe((message: any) => {
      this.activeUser = this.activeUser?.filter((user) => {
        return user !== message;
      });
    });
    this.chatService.notification().subscribe((message: any) => {
      this.lastMessageData = message;
    });
  }

  async loadfriendList(): Promise<void> {
    this.friendData = await this.apiService.request('friend', {
      userId: this.id,
    });
    this.friendData?.result.friends.forEach((element) => {
      this.friendList.push(element);
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
    this.friendId = data.friendId;
    this.chatService.joinedChat({ id: this.friendId });
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
    for (let i = 0; i < this.friendList.length; i++) {
      if (this.activeUser.indexOf(name) > -1) {
        return 'online';
      } else {
        return 'ofline';
      }
    }
  }

  async getAll(): Promise<void> {
    this.lastMessageData = await this.apiService.request('getAll');
    this.lastMessageData.sort((a, b) => {
      return (
        new Date(b.chats[0].createdOn).valueOf() -
        new Date(a.chats[0].createdOn).valueOf()
      );
    });
  }

  logout(): void {
    this.chatService.sendLogout(this.userName);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}

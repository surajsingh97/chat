import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { GetsetService } from 'src/app/services/getset.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  newMessage: string;
  messageList: any[] = [];
  friendId: any;
  check = false;
  userName: any;
  userId: any;
  recieverId: any;

  constructor(
    private chatService: ChatService,
    private getsetService: GetsetService,
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decode: any = jwt_decode(token);
      this.userName = decode.id.userName;
      this.userId = decode.id._id;
    }
    this.friendId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((message: any) => {
      this.messageList.push(message);
      console.log(message);
    });
    this.chatService.getTyping().subscribe((message: any) => {
      this.check = true;
    });
    this.chatService.noTyping().subscribe((message: any) => {
      this.check = false;
    });
    this.checkId();
    this.loadMessages();
  }

 
  sendMessage(): void {
    const messageData = {
      friendId: this.friendId,
      message: this.newMessage,
      createdOn: new Date(),
      senderId: this.userId,
      receiverId: this.recieverId,
      senderName: this.userName,
    };
    this.chatService.sendMessage(messageData);
    this.chatService.notTyping('nottyping');
    this.messageList.push(messageData);
    console.log('this is outgoing', this.messageList);
    this.newMessage = ' ';
  }

  async loadMessages(): Promise<void> {
    const messageData = await this.apiService.request('getMessage', {
      friendId: this.friendId,
    });
    console.log(messageData);
    messageData.chats.forEach((element) => {
      this.messageList.push(element);
    });
  }

  typing(event): void {
    this.chatService.onTyping('typing');
  }

  checkId(): void{
    const temp = this.friendId.split(' ');
    temp.forEach(element => {
      if (element !== this.userId){
          this.recieverId = element;
      }
    });
  }
}

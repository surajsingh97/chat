import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { GetsetService } from 'src/app/services/getset.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  newMessage: string;
  outgoingmessageList: string[] = [];
  incomingmessageList: string[] = [];
  data: any;
  check = false;
  previousData: any = {};

  constructor(
    private chatService: ChatService,
    private getsetService: GetsetService
  ) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((message: string) => {
      console.log(message);
      this.incomingmessageList.push(message);
      console.log('this is incominglist', this.incomingmessageList);
    });
    this.data = this.getsetService.getValue().userName;
    this.previousData = this.data;
    if (this.data === this.previousData) {
      this.check = false;
      this.data = this.getsetService.getValue().userName;
      this.previousData = this.data;
    } else {
      this.check = true;
    }

    console.log(this.getsetService.getValue());
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.newMessage);
    this.outgoingmessageList.push(this.newMessage);
    console.log('this is outgoing', this.outgoingmessageList);
    this.newMessage = ' ';
  }
}

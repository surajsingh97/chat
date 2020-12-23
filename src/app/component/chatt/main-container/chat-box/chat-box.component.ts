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

    setTimeout(() => {
      console.log(this.getsetService.getValue());
    }, 10000);
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.newMessage);
    this.outgoingmessageList.push(this.newMessage);
    console.log('this is outgoing', this.outgoingmessageList);
    this.newMessage = ' ';
  }
}

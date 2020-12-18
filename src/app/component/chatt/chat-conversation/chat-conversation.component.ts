import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { io } from 'socket.io-client';
import { AppConstants } from 'src/app/core/app.constants';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.css'],
})
export class ChatConversationComponent implements OnInit {

  // newMessage: string;
  messageList = [];
  // socket;
  @ViewChild('f', { static: false }) loginForm: NgForm;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    console.log(this.chatService.getMessage());
  }

  // setupsocketConncection(): void{
  //   this.socket = io(AppConstants.SOCKET_ENDPOINT);
  //   this.socket.on('message-broadcast', (data) => {
  //     if (data) {
  //       this.messageList.push(data);
  //       console.log(this.messageList);
  //     }
  //   });
  //   this.chatService.sendMessage('message', form.value.msg)
  // }

  onSubmit(form: NgForm): void{
    // this.socket.emit('message', form.value.msg);
    // this.messageList.push(form.value.msg);
    // console.log(this.messageList);
    this.chatService.sendMessage( form.value.msg);
  } 
  
}

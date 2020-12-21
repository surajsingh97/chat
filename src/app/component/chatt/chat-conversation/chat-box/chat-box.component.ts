import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  messageList = [];
  @ViewChild('f', { static: false }) messageForm: NgForm;
  
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
  } 

  onSubmit(form: NgForm): void {
    // this.socket.emit('message', form.value.msg);
    this.chatService.sendMessage(form.value.msg);
    this.messageList.push(form.value.msg);
    console.log(this.messageList);
    form.reset();
   
  }

}

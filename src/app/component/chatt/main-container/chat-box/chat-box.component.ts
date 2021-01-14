import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { GetsetService } from 'src/app/services/getset.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import jwt_decode from 'jwt-decode';
import { NgForm } from '@angular/forms';
import { ToasterServiceService } from 'src/app/toaster-service.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('f', { static: false }) messageForm: NgForm;

  public messageList: any[] = [];
  public check = false;
  public userName: any;
  public userId: any;
  public recieverId: any;
  public show = false;

  constructor(
    private chatService: ChatService,
    private getsetService: GetsetService,
    private activateRoute: ActivatedRoute,
    private apiService: ApiService,
    private toaster: ToasterServiceService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decode: any = jwt_decode(token);
      this.userName = decode.id.userName;
      this.userId = decode.id._id;
    }
  }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((message: any) => {
      this.messageList.push(message);
      this.toaster.showToaster(message.message);
    });
    this.chatService.getTyping().subscribe((message: any) => {
      this.check = true;
    });
    this.chatService.noTyping().subscribe((message: any) => {
      this.check = false;
    });
    this.activateRoute.params.subscribe((routeParams) => {
      this.loadMessages(routeParams.id);
    });
    this.checkId();
  }

  onSubmit(form: NgForm): void {
    const messageData = {
      friendId: this.activateRoute.snapshot.params.id,
      message: form.value.msg,
      createdOn: new Date(),
      senderId: this.userId,
      receiverId: this.recieverId,
      senderName: this.userName,
    };
    this.chatService.sendMessage(messageData);
    this.chatService.notTyping(this.activateRoute.snapshot.params.id);
    this.messageList.push(messageData);
    this.messageForm.reset();
    this.chatService.getlatMessage();
  }

  async loadMessages(params): Promise<void> {
    const messageData = await this.apiService.request('getMessage', {
      friendId: params,
    });
    this.messageList = [];
    messageData?.chats.forEach((element) => {
      this.messageList.push(element);
    });
  }

  typing(): void {
    this.chatService.onTyping(this.activateRoute.snapshot.params.id);
  }

  checkId(): void {
    const temp = this.activateRoute.snapshot.params.id.split(' ');
    temp.forEach((element) => {
      if (element !== this.userId) {
        this.recieverId = element;
      }
    });
  }
}

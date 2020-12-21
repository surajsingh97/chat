import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { FriendListComponent } from './chat-conversation/friend-list/friend-list.component';
import { ChatBoxComponent } from './chat-conversation/chat-box/chat-box.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';



@NgModule({
  declarations: [ChatConversationComponent, FriendListComponent, ChatBoxComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    FormsModule,
    ChatRoutingModule
  ],
  exports: [
    ChatBoxComponent,
    ChatConversationComponent,
    FriendListComponent
  ]
})
export class ChattModule { }

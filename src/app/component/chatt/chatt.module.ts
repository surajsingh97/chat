import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [
    ChatConversationComponent,
  ],
  imports: [CommonModule, MDBBootstrapModule, FormsModule, ChatRoutingModule],
 
})
export class ChattModule {}

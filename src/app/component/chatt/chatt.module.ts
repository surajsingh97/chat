import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChattRoutingModule } from './chatt-routing.module';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';

@NgModule({
  declarations: [ChatConversationComponent],
  imports: [CommonModule, ChattRoutingModule],
})
export class ChattModule {
  
}

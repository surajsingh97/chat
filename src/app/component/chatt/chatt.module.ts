import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChattRoutingModule } from './chatt-routing.module';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChatConversationComponent],
  imports: [CommonModule, ChattRoutingModule, FormsModule],
})
export class ChattModule {}

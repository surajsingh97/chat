import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';

const routes: Routes = [
    {path: 'chat', component: ChatConversationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}

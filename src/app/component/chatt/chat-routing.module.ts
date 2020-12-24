import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatBoxComponent } from './main-container/chat-box/chat-box.component';
import { DefaultPageComponent } from './main-container/default-page/default-page.component';
import { FriendListComponent } from './main-container/friend-list/friend-list.component';
import { MainContainerComponent } from './main-container/main-container.component';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      { path: '', component: DefaultPageComponent },
      { path: 'chat/:id', component: ChatBoxComponent },
      { path: '', redirectTo: 'home', component: DefaultPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}

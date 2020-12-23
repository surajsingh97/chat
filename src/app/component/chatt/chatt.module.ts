import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { MainContainerComponent } from './main-container/main-container.component';
import { ChatBoxComponent } from './main-container/chat-box/chat-box.component';
import { FriendListComponent } from './main-container/friend-list/friend-list.component';

@NgModule({
  declarations: [MainContainerComponent, ChatBoxComponent, FriendListComponent],
  imports: [CommonModule, MDBBootstrapModule, FormsModule, ChatRoutingModule],
})
export class ChattModule {}

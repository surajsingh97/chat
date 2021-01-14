import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(msg: any): void {
    this.socket.emit('message', msg);
  }

  onTyping(msg): void {
    this.socket.emit('typing', msg);
  }

  notTyping(msg): void {
    this.socket.emit('nottyping', msg);
  }

  login(msg): void {
    this.socket.emit('onlogin', msg);
  }

  sendLogout(msg): void {
    this.socket.emit('onlogout', msg);
  }

  joinedChat(msg: any): void {
    this.socket.emit('joined', msg);
  }

  getUser(msg: any): void {
    this.socket.emit('user', msg);
  }

  getlatMessage(): void {
    this.socket.emit('getlastMessage');
  }

  public getMessages = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }

  public getTyping = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('typing', (message) => {
        observer.next(message);
      });
    });
  }

  public noTyping = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('nottyping', (message) => {
        observer.next(message);
      });
    });
  }

  public onlogIn = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('login', (message: any) => {
        observer.next(message);
      });
    });
  }

  public onlogOut = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('logout', (message: any) => {
        observer.next(message);
      });
    });
  }

  public notification = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('notify', (message: any) => {
        observer.next(message);
      });
    });
  }
}

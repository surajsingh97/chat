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

  public getMessages = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  };

  public getTyping = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('typing', (message) => {
        observer.next(message);
      });
    });
  };

  public noTyping = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('nottyping', (message) => {
        observer.next(message);
      });
    });
  };

  public onloggedIn = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('onlogin', (message) => {
        observer.next(message);
      });
    });
  };
}

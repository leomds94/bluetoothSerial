import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { MessageSendPage } from '../message-send/message-send';

import { Message } from '../../models/Message';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  messages: Message[] = [];
  msgToSend: string = '';
  isCordova: boolean;

  constructor(public db: AngularFireDatabase, private platform: Platform, public navCtrl: NavController) {
    this.db.list('messages').valueChanges()
      .subscribe(data => {
        this.messages = data as Message[];

        this.scrollToBottom();
      });

    if (this.platform.is('cordova')) {
      this.isCordova = true;
    }
    else {
      this.isCordova = false;
    }
  }

  sendMessage() {
    if (this.platform.is('cordova')) {
      var message: Message = {
        message: this.msgToSend,
        device: 'cordova',
        time: new Date().toLocaleString('en-GB')
      };
    }
    else {
      var message: Message = {
        message: this.msgToSend,
        device: 'web',
        time: new Date().toLocaleString('en-GB')
      };
    }

    this.db.list('messages').push(message);

    this.msgToSend = '';

    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content._scroll)
        this.content.scrollToBottom(0);
    }, 10);
  }

  messagePage() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(MessageSendPage, {resolve: resolve});
    }).then(data => {
      this.msgToSend = data as string;
    });
  }

  clearMessages() {
    this.db.list('messages').remove();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { SavedMessage } from '../../models/SavedMessage';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-message-send',
  templateUrl: 'message-send.html',
})
export class MessageSendPage {

  savedMessage = new SavedMessage();

  constructor(public db: AngularFireDatabase, private platform: Platform, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidEnter() {
    this.db.list('savedMessages').valueChanges()
    .subscribe(data => {
      var savedMessages = data as SavedMessage[];

      if (this.platform.is('cordova')) {
        if(savedMessages.some(message => message.device == 'cordova')){
          this.savedMessage = savedMessages.find(message => message.device == 'cordova');
        }
        else {
          this.savedMessage.savedMessageId = this.db.list('messages').push({}).key;
          this.savedMessage.device = 'cordova';
          this.db.object('savedMessages/' + this.savedMessage.savedMessageId).update(this.savedMessage);
        }
      }
      else {
        if(savedMessages.some(message => message.device == 'web')){
          this.savedMessage = savedMessages.find(message => message.device == 'web');
        }
        else {
          this.savedMessage.savedMessageId = this.db.list('messages').push({}).key;
          this.savedMessage.device = 'web';
          this.db.object('savedMessages/' + this.savedMessage.savedMessageId).update(this.savedMessage);
        }
      }
    });
  }

  send(msg) {
    if(msg == 'm1') {
      this.navParams.get('resolve')(this.savedMessage.m1);
    } else if(msg == 'm2') {
      this.navParams.get('resolve')(this.savedMessage.m2);
    } else if(msg == 'm3') {
      this.navParams.get('resolve')(this.savedMessage.m3);
    } else if(msg == 'p') {
      this.navParams.get('resolve')(this.savedMessage.p);
    }

    this.db.object('savedMessages/' + this.savedMessage.savedMessageId).update(this.savedMessage);

    this.navCtrl.pop();
  }
}

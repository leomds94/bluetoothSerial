import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageSendPage } from './message-send';

@NgModule({
  declarations: [
    MessageSendPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageSendPage),
  ],
})
export class MessageSendPageModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MessageSendPage } from '../pages/message-send/message-send';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ConnectPage } from '../pages/connect/connect';

var config = {
  apiKey: "AIzaSyAz890auPbNfwE16G1qRN3ZrziOMvVyShA",
  authDomain: "blueserialtec.firebaseapp.com",
  databaseURL: "https://blueserialtec.firebaseio.com",
  projectId: "blueserialtec",
  storageBucket: "blueserialtec.appspot.com",
  messagingSenderId: "777611192444"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnectPage,
    MessageSendPage
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnectPage,
    MessageSendPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

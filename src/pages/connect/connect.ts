import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage {

  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    bluetoothSerial.enable();
  }

  unpairedDevices: any[];
  pairedDevices: any;
  gettingDevices: Boolean;

  startScanning() {
    this.pairedDevices = [];
    this.unpairedDevices = [];
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      var devices = success as any[];
      devices.forEach(device => {
        if(device.name != "") {
          this.unpairedDevices.push(device);
        }
      });
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      })
  }
  // success = (data) => alert(data);
  // fail = (error) => alert(error);

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Conectar',
      message: 'Você realmente deseja conectar-se?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Conectar',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe();
            this.navCtrl.push(HomePage);
          }
        }
      ]
    });
    alert.present();

  }

  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Desconectar?',
      message: 'Você realmente deseja conectar-se?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Desconectar',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

}

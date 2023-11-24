import { Component } from '@angular/core';
import { MenuController,NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-the-login',
  templateUrl: 'the-login.page.html',
  styleUrls: ['the-login.page.scss'],
})
export class TheLoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private menuController: MenuController
  ) {}
  ionViewWillEnter() {
    this.menuController.enable(false, 'main-menu'); // Reemplaza 'menuID' con el ID de tu menú
  }
  ionViewDidLeave() {
    this.menuController.enable(true, 'main-menu');
  }


  async login() {
    // Verifica las credenciales directamente en tu aplicación
    if (this.username === 'mirabike' && this.password === 'duoc2023') {
      this.navCtrl.navigateForward('/homes-menu');
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Credenciales incorrectas',
        duration: 3000,
        position: 'top',
      });
      toast.present();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Servicios/authUsuarios.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pavellon',
  templateUrl: './pavellon.page.html',
  styleUrls: ['./pavellon.page.scss'],
})
export class PavellonPage implements OnInit {

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private servicios: AuthService,
    private alerta: AlertController ) {  }

  ngOnInit() {  }

  cerrarSesion() {
    this.servicios.Cerrarsesion().then(res => {
      this.alerta.create({
        header: 'Cerrada la sesión',
        message: 'Se ha cerrado la sesión.',
        buttons: ['Ok.']
      }).then(alert => {
        alert.present();
      });
      this.router.navigate(['/login']);
    }).catch(error => {
      this.alerta.create({
        header: 'Error de cierre.',
        message: 'Algo salió mal. Compruebe que no tenga procesos abiertos.',
        buttons: ['Vale.']
      }).then(alert => {
        alert.present();
      });
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Despliegue.',
      buttons: [{
        text: 'Cerrar sesión.',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.cerrarSesion();
        },
      }]
    });
    await actionSheet.present();
  }

}

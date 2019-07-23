import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private alert: AlertController) {
    
  } 

  Logear_registrar(){
    this.router.navigate(["/login"]);
  }

  Cerrarlaaplicacion(){
    this.alert.create({
      header: 'Con gusto.',
      message: 'Hasta la próxima estimado usuario.',
      buttons: ['Entendido.']
    }).then(alert => {
      alert.present();
    });
  }
  
  Desinstalarlaaplicacion(){
    this.alert.create({
      header: '¡Qué pena usuario!',
      message: 'Lamentamos el desinterés, ¿qué desea hacer?',
      buttons: ['Cerrar.', 'Desinstalar.']
    }).then(alert => {
      alert.present();
    });
  }
}

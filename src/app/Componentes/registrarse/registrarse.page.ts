import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../Servicios/authUsuarios.service';
import { Persona } from '../../Entidades/EntPersonas.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  confirmaciondeclavedeacceso: string;
  persona: Persona = {} as Persona;

  constructor(private router: Router, private AS: AuthService, private alert: AlertController) {  }

  ngOnInit() {
  }

  Haciasesion() {
    this.router.navigate(['/login']);
  }

  Registrarcredenciales(persona: Persona) {
    if (this.confirmaciondeclavedeacceso === persona.Clavedeacceso) {
      this.AS.Registrar(persona).then(res => {
        this.alert.create({
          header: 'Registrado.',
          message: 'Enhora buena, se registraron sus datos y credenciales.',
          buttons: ['Ir a sesión.']
        }).then(alert => {
          alert.present();
        });
        this.router.navigate(['/login']);
      }).catch(error => {
        this.alert.create({
          header: 'Error de registro.',
          message: 'Algo salió mal. No se pudo registrar sus datos y credenciales.',
          buttons: ['Entiendo.']
        }).then(alert => {
          alert.present();
        });
      });
    } else {
      this.alert.create({
        header: 'Error de contraseñas.',
        message: 'Verifique las claves de acceso. No coinciden.',
        buttons: ['Entendido.']
      }).then(alert => {
        alert.present();
      });
    }
  }
}

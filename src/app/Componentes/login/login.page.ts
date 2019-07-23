import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../Servicios/authUsuarios.service';
import { AlertController } from '@ionic/angular';
import { Persona } from 'src/app/Entidades/EntPersonas.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  persona: Persona = {} as Persona;
  personas: Persona[] = [];
  correo: string;
  clavedeacceso: string;

  constructor(private router: Router, private AS: AuthService, private alert: AlertController) { }

  ngOnInit() {  }

  Haciahome() {
    this.router.navigate(['/home']);
  }

  /*
  getPersonas() {
    this.AS.getPersonas().subscribe((personaList: Persona[]) => {
      const perso: Persona[] = [];
      personaList.forEach(per => {
        perso.push(per);
      });
      this.personas = perso;
    });
  }
  */

  /*
  getPersona(correo: string) {
    this.AS.getPersona('').subscribe((filtropersona: Persona = {} as Persona) => {
      return filtropersona;
    });
    // return this.AS.getPersona(correo);
  }
  */

  Iniciarsesion() {
    this.AS.Iniciarsesion(this.correo, this.clavedeacceso).then(res => {
      this.alert.create({
        header: 'Sesión iniciada.',
        message: 'Se inició la sesión. Disfrute del aplicativo.',
        buttons: ['Aceptar.']
      }).then(alert => {
        alert.present();
      });
      this.router.navigate(['/pavellon/productos']);
    }).catch(error => {
      this.alert.create({
        header: 'Error de sesión.',
        message: 'Las credenciales de sesión no son válidas.',
        buttons: ['Entiendo.']
      }).then(alert => {
        alert.present();
      });
    });
  }
}

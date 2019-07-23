import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Servicios/authUsuarios.service';
import { Persona } from 'src/app/Entidades/EntPersonas.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  persona: Persona = {} as Persona;
  nuevapersona: Persona = {} as Persona;
  // personas: Persona[] = [];
  autenticado = null;

  constructor( private servicios: AuthService, private alert: AlertController, private router: Router) {
    servicios.recibeAuth().onAuthStateChanged((user) => {
      if (user) {
        this.autenticado = user;
        this.persona = this.getPersona(this.autenticado.email);
        // this.getPersonas();
      } else {
        this.autenticado = null;
        this.persona = null;
      }
    });
  }

  ngOnInit() {
  }
  /*
  getPersonas(): Persona[] {
    this.servicios.getPersonas().subscribe((personaList: Persona[]) => {
      personaList.forEach(per => {
        this.personas.push(per);
      });
    });
    return this.personas;
  }
  */

  getPersona(correo: string): Persona {
    this.servicios.getPersona(correo).subscribe((filtro: Persona = {} as Persona) => {
      this.persona = filtro;
     });
    return this.persona;
  }

  modificarPersona(nuevapersona: Persona) {
    this.nuevapersona.Identificacion = this.persona.Identificacion;
    this.nuevapersona.Correo = this.persona.Correo;
    this.nuevapersona.Clavedeacceso = this.persona.Clavedeacceso;
    this.servicios.Modificar(nuevapersona).then(res => {
      this.alert.create({
        header: 'Modificado.',
        message: 'Enhora buena, se modificaron sus datos personales.',
        buttons: ['Vale.']
      }).then(alert => {
        alert.present();
      });
      this.router.navigate(['pavellon/perfil']);
    }).catch(error => {
      this.alert.create({
        header: 'Error de modificación.',
        message: 'Algo salió mal. No se pudieron modificar sus datos.',
        buttons: ['Entiendo.']
      }).then(alert => {
        alert.present();
      });
    });
  }

}

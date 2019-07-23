import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Servicios/authUsuarios.service';
import { Persona } from 'src/app/Entidades/EntPersonas.model';
import { Procesos } from 'src/app/Entidades/EntProcesos.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  autenticado = null;
  persona: Persona = {} as Persona;
  compras: Procesos[] = [];
  det = false;

  constructor(private servicios: AuthService, private alerta: AlertController) {
    servicios.recibeAuth().onAuthStateChanged((user) => {
      if (user) {
        this.autenticado = user;
        this.persona = this.getPersona(this.autenticado.email);
        this.getCompras(this.persona.Correo);
      } else {
        this.autenticado = null;
        this.persona = null;
      }
    });
  }

  ngOnInit() {
  }

  getPersona(correo: string): Persona {
    this.servicios.getPersona(correo).subscribe((filtro: Persona = {} as Persona) => {
      this.persona = filtro;
     });
    return this.persona;
  }

  getCompras(correo: string): Procesos[] {
    this.servicios.getProcesos().subscribe((ListaProcesos: Procesos[]) => {
      if (ListaProcesos.length !== 0) {
        ListaProcesos.forEach(com => {
          if (com.Comprador === this.persona.Correo) {
            this.compras.push(com);
            this.det = true;
          }
        });
      } else {
        this.alerta.create({
          header: 'Sin procesos en sistema.',
          message: 'No hay procesos de ningún tipo.',
          buttons: ['Vale.']
        }).then(alerta => {
          alerta.present();
        });
      }
    });
    /*alert(this.det);
    if (this.compras.length === 0) {
      this.alerta.create({
        header: 'Sin compras en sistema.',
        message: 'No hay procesos de compras en su sistema.',
        buttons: ['Vale.']
      }).then(alerta => {
        alerta.present();
      });
    }*/
    return this.compras;
  }

}

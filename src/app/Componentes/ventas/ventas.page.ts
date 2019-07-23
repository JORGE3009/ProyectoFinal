import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Servicios/authUsuarios.service';
import { Persona } from 'src/app/Entidades/EntPersonas.model';
import { Procesos } from 'src/app/Entidades/EntProcesos.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {

  autenticado = null;
  persona: Persona = {} as Persona;
  ventas: Procesos[] = [];

  constructor(private servicios: AuthService, private alerta: AlertController) {
    servicios.recibeAuth().onAuthStateChanged((user) => {
      if (user) {
        this.autenticado = user;
        this.persona = this.getPersona(this.autenticado.email);
        this.getVentas(this.persona.Correo);
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

  getVentas(correo: string): Procesos[] {
    this.servicios.getProcesos().subscribe((ListaProcesos: Procesos[]) => {
      if (ListaProcesos.length !== 0) {
        ListaProcesos.forEach(ven => {
          if (ven.Vendedor === this.persona.Correo) {
            this.ventas.push(ven);
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
    /*if (this.ventas.length === 0) {
      this.alerta.create({
        header: 'Sin ventas en sistema.',
        message: 'No hay procesos de ventas en su sistema.',
        buttons: ['Vale.']
      }).then(alerta => {
        alerta.present();
      });
    }*/
    return this.ventas;
  }

}

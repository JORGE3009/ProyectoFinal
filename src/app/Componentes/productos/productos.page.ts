import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/Entidades/EntArticulo.model';
import { AuthService } from '../../Servicios/authUsuarios.service';
import { AlertController } from '@ionic/angular';
import { Procesos } from 'src/app/Entidades/EntProcesos.model';
import { Persona } from 'src/app/Entidades/EntPersonas.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  compraProducto: Procesos = {} as Procesos;
  articulos: Articulo[] = [];
  autenticado = null;
  index: string[] = [];
  persona: Persona = {} as Persona;

  constructor(private servicios: AuthService, private alerta: AlertController, private router: Router) {
    this.articulos = [];
    servicios.recibeAuth().onAuthStateChanged((user) => {
      if (user) {
        this.autenticado = user;
        this.getArticulos(this.autenticado.email);
      } else {
        this.autenticado = null;
      }
    });
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

  getPersona(correo: string): Persona {
    this.servicios.getPersona(correo).subscribe((filtro: Persona = {} as Persona) => {
      this.persona = filtro;
     });
    return this.persona;
  }

  getArticulos(correo: string): Articulo[] {
    this.servicios.getArticulos().subscribe((ListaArticulo: Articulo[]) => {
      if (ListaArticulo.length !== 0) {
        ListaArticulo.forEach(art => {
          if (art.referenciadedocumento !== this.autenticado.email + art.Codigo.toString()) {
            this.articulos.push(art);
          }
        });
      } else {
        this.alerta.create({
          header: 'Sin productos.',
          message: 'No hay artículos en sistema.',
          buttons: ['Vale.']
        }).then(alerta => {
          alerta.present();
        });
      }
    });
    return this.articulos;
  }

  comprarArticulo(Prop: string, Preu: number, Arti: string, Cant: number) {
    this.index.push('val');
    if (this.index.length === 1) {
      this.compraProducto.Comprador = this.persona.Correo;
      this.compraProducto.Articulo = Arti;
      this.compraProducto.Cantidad = Number(Cant);
      this.compraProducto.Vendedor = Prop;
      this.compraProducto.Preciototal = Preu * Cant;
      this.servicios.registrarProcesp(this.compraProducto).then(res => {
        this.alerta.create({
          header: 'Compra registrada..',
          message: 'Enhora buena, se registraró su compra.',
          buttons: ['Ir a sesión.']
        }).then(alert => {
          alert.present();
        });
        this.router.navigate(['pavellon/compras']);
      }).catch(error => {
        this.alerta.create({
          header: 'Error de compra.',
          message: 'Algo salió mal. No se pudo registrar la compra.',
          buttons: ['Entiendo.']
        }).then(alert => {
          alert.present();
        });
      });
    }
  }

}

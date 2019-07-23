import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/Entidades/EntArticulo.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../Servicios/authUsuarios.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {

  articulo: Articulo = {} as Articulo;
  autenticado = null;

  constructor(private router: Router, private alert: AlertController, private servicios: AuthService) {
    servicios.recibeAuth().onAuthStateChanged((user) => {
      if (user) {
        this.autenticado = user;
      } else {
        this.autenticado = null;
      }
    });
  }

  ngOnInit() {
  }

  subirArticulo(articulo: Articulo) {
    articulo.propietario = this.autenticado.email;
    articulo.referenciadedocumento = this.articulo.propietario + this.articulo.Codigo.toString();
    this.servicios.registrarArticulo(articulo).then(res => {
      this.alert.create({
        header: 'Registrado.',
        message: 'Enhora buena, artículo registrado.',
        buttons: ['Ok.']
      }).then(alert => {
        alert.present();
      });
      this.router.navigate(['pavellon/productos']);
    }).catch(error => {
      this.alert.create({
      header: 'Error de registro.',
      message: 'Algo salió mal. No se pudo registrar el artículo.',
      buttons: ['Entiendo.']
      }).then(alert => {
        alert.present();
      });
    });
  }

}

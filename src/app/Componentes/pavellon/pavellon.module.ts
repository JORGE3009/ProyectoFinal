import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PavellonPage } from './pavellon.page';

const routes: Routes = [
  {
    path: '',
    component: PavellonPage,
    children:[
      { path: 'perfil', loadChildren: '../perfil/perfil.module#PerfilPageModule' },
      { path: 'productos', loadChildren: '../productos/productos.module#ProductosPageModule' },
      { path: 'compras', loadChildren: '../compras/compras.module#ComprasPageModule' },
      { path: 'ventas', loadChildren: '../ventas/ventas.module#VentasPageModule' },
      { path: 'articulos', loadChildren: '../articulos/articulos.module#ArticulosPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PavellonPage]
})
export class PavellonPageModule {}

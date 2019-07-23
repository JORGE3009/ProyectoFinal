import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: './Componentes/login/login.module#LoginPageModule' },
  { path: 'registrarse', loadChildren: './Componentes/registrarse/registrarse.module#RegistrarsePageModule' },
  { path: 'pavellon', loadChildren: './Componentes/pavellon/pavellon.module#PavellonPageModule' },
  { path: 'perfil', loadChildren: './Componentes/perfil/perfil.module#PerfilPageModule' },
  { path: 'productos', loadChildren: './Componentes/productos/productos.module#ProductosPageModule' },
  { path: 'compras', loadChildren: './Componentes/compras/compras.module#ComprasPageModule' },
  { path: 'ventas', loadChildren: './Componentes/ventas/ventas.module#VentasPageModule' },
  { path: 'articulos', loadChildren: './Componentes/articulos/articulos.module#ArticulosPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

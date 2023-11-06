import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'the-login', pathMatch: 'full' },
  { path: 'login',
   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'historial-cliente',
    loadChildren: () => import('./pages/historial-cliente/historial-cliente.module').then( m => m.HistorialClientePageModule)
  },
  {
    path: 'historial-ventas',
    loadChildren: () => import('./pages/historial-ventas/historial-ventas.module').then( m => m.HistorialVentasPageModule)
  },
  {
    path: 'trabajos-taller',
    loadChildren: () => import('./pages/trabajos-taller/trabajos-taller.module').then( m => m.TrabajosTallerPageModule)
  },
  {
    path: 'trabajadores',
    loadChildren: () => import('./pages/trabajadores/trabajadores.module').then( m => m.TrabajadoresPageModule)
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./pages/mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule)
  },
  {
    path: 'homes-menu',
    loadChildren: () => import('./pages/homes-menu/homes-menu.module').then( m => m.HomesMenuPageModule)
  },
  {
    path: 'historial-cliente',
    loadChildren: () => import('./pages/historial-cliente/historial-cliente.module').then( m => m.HistorialClientePageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'the-login',
    loadChildren: () => import('./pages/the-login/the-login.module').then( m => m.TheLoginPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


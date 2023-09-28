import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialVentasPage } from './historial-ventas.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialVentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialVentasPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrabajosTallerPage } from './trabajos-taller.page';

const routes: Routes = [
  {
    path: '',
    component: TrabajosTallerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabajosTallerPageRoutingModule {}

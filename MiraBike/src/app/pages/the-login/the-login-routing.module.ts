import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TheLoginPage } from './the-login.page';

const routes: Routes = [
  {
    path: '',
    component: TheLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TheLoginPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomesMenuPage } from './homes-menu.page';

const routes: Routes = [
  {
    path: '',
    component: HomesMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomesMenuPageRoutingModule {}

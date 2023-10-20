import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomesMenuPageRoutingModule } from './homes-menu-routing.module';

import { HomesMenuPage } from './homes-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomesMenuPageRoutingModule
  ],
  declarations: [HomesMenuPage]
})
export class HomesMenuPageModule {}

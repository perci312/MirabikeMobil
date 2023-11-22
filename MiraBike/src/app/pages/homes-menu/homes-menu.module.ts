import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomesMenuPageRoutingModule } from './homes-menu-routing.module';

import { HomesMenuPage } from './homes-menu.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomesMenuPageRoutingModule
  ],
  declarations: [HomesMenuPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomesMenuPageModule {}

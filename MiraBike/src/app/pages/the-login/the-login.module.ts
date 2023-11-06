import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TheLoginPageRoutingModule } from './the-login-routing.module';

import { TheLoginPage } from './the-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TheLoginPageRoutingModule
  ],
  declarations: [TheLoginPage]
})
export class TheLoginPageModule {}

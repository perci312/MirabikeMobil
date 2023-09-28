import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajosTallerPageRoutingModule } from './trabajos-taller-routing.module';

import { TrabajosTallerPage } from './trabajos-taller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajosTallerPageRoutingModule
  ],
  declarations: [TrabajosTallerPage]
})
export class TrabajosTallerPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChechInPageRoutingModule } from './chech-in-routing.module';

import { ChechInPage } from './chech-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChechInPageRoutingModule
  ],
  declarations: [ChechInPage]
})
export class ChechInPageModule {}

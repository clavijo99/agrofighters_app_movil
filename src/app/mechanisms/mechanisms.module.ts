import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MechanismsPageRoutingModule } from './mechanisms-routing.module';

import { MechanismsPage } from './mechanisms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MechanismsPageRoutingModule
  ],
  declarations: [MechanismsPage]
})
export class MechanismsPageModule {}

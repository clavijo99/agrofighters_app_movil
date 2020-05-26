import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MechanismsPage } from './mechanisms.page';

const routes: Routes = [
  {
    path: '',
    component: MechanismsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MechanismsPageRoutingModule {}

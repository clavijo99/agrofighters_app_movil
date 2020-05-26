import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChechInPage } from './chech-in.page';

const routes: Routes = [
  {
    path: '',
    component: ChechInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChechInPageRoutingModule {}

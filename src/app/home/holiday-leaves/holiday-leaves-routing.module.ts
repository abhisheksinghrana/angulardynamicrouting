import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HolidayLeavesComponent } from './holiday-leaves.component';

const routes: Routes = [
  {
    path: '',
    component: HolidayLeavesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidayLeavesRoutingModule {}

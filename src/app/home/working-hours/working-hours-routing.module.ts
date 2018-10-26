import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkingHoursComponent } from './working-hours.component';

const routes: Routes = [
  {
    path: '',
    component: WorkingHoursComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingHoursRoutingModule {}

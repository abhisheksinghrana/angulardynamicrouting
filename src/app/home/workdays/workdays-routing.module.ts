import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkdaysComponent } from './workdays.component';

const routes: Routes = [
  {
    path: '',
    component: WorkdaysComponent,
    children: [
      {
        path: 'holidayleaves',
        loadChildren:
          'app/home/holiday-leaves/holiday-leaves.module#HolidayLeavesModule'
      },
      {
        path: 'workinghours',
        loadChildren:
          'app/home/working-hours/working-hours.module#WorkingHoursModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkdaysRoutingModule {}

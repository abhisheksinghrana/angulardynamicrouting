import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'userhoursoverview',
        loadChildren:
          './user-hours-overview/user-hours-overview.module#UserHoursOverviewModule'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'userhoursoverview'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}

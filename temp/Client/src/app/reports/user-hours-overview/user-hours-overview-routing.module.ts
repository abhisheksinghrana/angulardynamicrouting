import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserHoursOverviewComponent } from './user-hours-overview.component';

const routes: Routes = [
  {
    path: '',
    component: UserHoursOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHoursOverviewRoutingModule {}

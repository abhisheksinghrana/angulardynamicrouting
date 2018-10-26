import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamReportComponent } from '../team-report/team-report.component';

const routes: Routes = [
  {
    path: '',
    component: TeamReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamReportRoutingModule {}

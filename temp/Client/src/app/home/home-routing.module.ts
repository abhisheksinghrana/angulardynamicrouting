import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { TeamReportAccessGuard } from '../shared/guards/team-report-access.guard';
import { ManageTimesheetGuard } from '../shared/guards/manage-timesheet.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'timesheet',
        loadChildren: '../timesheet/timesheet.module#TimesheetModule'
      },
      {
        path: 'teamreport',
        canActivate: [TeamReportAccessGuard],
        loadChildren: '../team-report/team-report.module#TeamReportModule'
      },
      {
        path: 'managetimesheets',
        canActivate: [ManageTimesheetGuard],
        loadChildren:
          '../manage-timesheet/manage-timesheet.module#ManageTimesheetModule'
      },
      {
        path: 'reports',
        loadChildren: '../reports/reports.module#ReportsModule'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'timesheet'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

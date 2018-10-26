import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'expensetracker',
        loadChildren:
          'app/home/expense-tracker/expense-tracker.module#ExpenseTrackerModule'
      },
      {
        path: 'leavetracker',
        loadChildren:
          'app/home/leave-tracker/leave-tracker.module#LeaveTrackerModule'
      },
      {
        path: 'timemanagement',
        loadChildren:
          'app/home/time-management/time-management.module#TimeManagementModule'
      },
      {
        path: 'workdays',
        loadChildren: 'app/home/workdays/workdays.module#WorkdaysModule'
      },
      {
        path: 'source',
        loadChildren: 'app/home/source/source.module#SourceModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

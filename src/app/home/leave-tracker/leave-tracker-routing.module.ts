import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveTrackerComponent } from './leave-tracker.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveTrackerComponent,
    children: [
      {
        path: 'categories',
        loadChildren:
          'app/home/leave-tracker/leave-categories/leave-categories.module#LeaveCategoriesModule'
      },
      {
        path: 'workflow',
        loadChildren: 'app/home/workflow/workflow.module#WorkflowModule'
      },
      {
        path: 'sourcesettings',
        loadChildren:
          'app/home/source-settings/source-settings.module#SourceSettingsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveTrackerRoutingModule {}

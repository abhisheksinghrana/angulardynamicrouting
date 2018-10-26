import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeManagementComponent } from './time-management.component';

const routes: Routes = [
  {
    path: '',
    component: TimeManagementComponent,
    children: [
      {
        path: 'loggingwork',
        loadChildren:
          'app/home/time-management/logging-work/logging-work.module#LoggingWorkModule'
      },
      {
        path: 'categories',
        loadChildren:
          'app/home/time-management/time-categories/time-categories.module#TimeCategoriesModule'
      },
      {
        path: 'internalcategories',
        loadChildren:
          'app/home/time-management/internal-categories/internal-categories.module#InternalCategoriesModule'
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
export class TimeManagementRoutingModule {}

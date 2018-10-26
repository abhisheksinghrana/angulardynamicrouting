import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseTrackerComponent } from './expense-tracker.component';

const routes: Routes = [
  {
    path: '',
    component: ExpenseTrackerComponent,
    children: [
      {
        path: 'categories',
        loadChildren:
          'app/home/expense-tracker/expense-categories/expense-categories.module#ExpenseCategoriesModule'
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
export class ExpenseTrackerRoutingModule {}

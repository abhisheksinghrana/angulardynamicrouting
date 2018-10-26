import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseCategoriesComponent } from './expense-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ExpenseCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseCategoriesRoutingModule {}

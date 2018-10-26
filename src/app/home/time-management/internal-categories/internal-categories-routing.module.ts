import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalCategoriesComponent } from './internal-categories.component';

const routes: Routes = [
  {
    path: '',
    component: InternalCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalCategoriesRoutingModule {}

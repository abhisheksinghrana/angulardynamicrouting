import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeCategoriesComponent } from './time-categories.component';

const routes: Routes = [
  {
    path: '',
    component: TimeCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeCategoriesRoutingModule {}

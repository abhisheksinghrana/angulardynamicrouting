import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveCategoriesComponent } from './leave-categories.component';

const routes: Routes = [
  {
    path: '',
    component: LeaveCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveCategoriesRoutingModule {}

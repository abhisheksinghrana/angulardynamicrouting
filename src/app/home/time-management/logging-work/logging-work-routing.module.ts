import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggingWorkComponent } from './logging-work.component';

const routes: Routes = [
  {
    path: '',
    component: LoggingWorkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggingWorkRoutingModule {}

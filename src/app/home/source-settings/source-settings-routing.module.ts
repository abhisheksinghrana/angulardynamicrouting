import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SourceSettingsComponent } from './source-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SourceSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceSettingsRoutingModule {}

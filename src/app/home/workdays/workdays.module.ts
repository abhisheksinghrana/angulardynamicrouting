import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WorkdaysRoutingModule } from './workdays-routing.module';

import { WorkdaysComponent } from './workdays.component';

@NgModule({
  imports: [SharedModule, WorkdaysRoutingModule],
  declarations: [WorkdaysComponent]
})
export class WorkdaysModule {}

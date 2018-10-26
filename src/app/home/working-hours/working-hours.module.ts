import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WorkingHoursRoutingModule } from './working-hours-routing.module';

import { WorkingHoursComponent } from './working-hours.component';

@NgModule({
  imports: [SharedModule, WorkingHoursRoutingModule],
  declarations: [WorkingHoursComponent]
})
export class WorkingHoursModule {}

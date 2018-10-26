import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { LeaveTrackerRoutingModule } from './leave-tracker-routing.module';

import { LeaveTrackerComponent } from './leave-tracker.component';

@NgModule({
  imports: [SharedModule, LeaveTrackerRoutingModule],
  declarations: [LeaveTrackerComponent]
})
export class LeaveTrackerModule {}

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ManageTimesheetRoutingModule } from './manage-timesheet-routing.module';

import { ManageTimesheetComponent } from './manage-timesheet.component';

@NgModule({
  imports: [SharedModule, ManageTimesheetRoutingModule],
  declarations: [ManageTimesheetComponent]
})
export class ManageTimesheetModule {}

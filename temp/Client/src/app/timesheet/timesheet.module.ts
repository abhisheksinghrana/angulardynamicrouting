import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TimesheetRoutingModule } from './timesheet-routing.module';

import { TimesheetComponent } from './timesheet.component';

@NgModule({
  imports: [CommonModule, TimesheetRoutingModule, SharedModule],
  declarations: [TimesheetComponent]
})
export class TimesheetModule {}

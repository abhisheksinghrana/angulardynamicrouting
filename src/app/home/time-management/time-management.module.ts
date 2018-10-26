import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TimeManagementRoutingModule } from './time-management-routing.module';

import { TimeManagementComponent } from './time-management.component';

import { TimeCategoriesService } from './services/time-categories.service';
import { InternalCategoriesService } from './services/internal-categories.service';
import { TimeWorklogService } from './services/time-worklog.service';

@NgModule({
  imports: [SharedModule, TimeManagementRoutingModule],
  declarations: [TimeManagementComponent],
  providers: [
    TimeCategoriesService,
    InternalCategoriesService,
    TimeWorklogService
  ]
})
export class TimeManagementModule {}

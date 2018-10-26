import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UserHoursOverviewRoutingModule } from './user-hours-overview-routing.module';

import { UserHoursOverviewComponent } from './user-hours-overview.component';
import { WorkItemComponent } from '../components/work-item/work-item.component';
import { WorkItemHoursComponent } from '../components/work-item-hours/work-item-hours.component';

@NgModule({
  imports: [SharedModule, UserHoursOverviewRoutingModule],
  declarations: [
    UserHoursOverviewComponent,
    WorkItemComponent,
    WorkItemHoursComponent
  ]
})
export class UserHoursOverviewModule {}
